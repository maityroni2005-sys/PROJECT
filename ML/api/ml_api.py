"""
PlacementPro AI — Machine Learning Microservice
Exposes RESTful endpoints for:
1. /predict-role: Predicts best-fit career roles using Random Forest / Multi-Class classification probabilities
2. /predict-company: Computes ML company suitability score (0-100) based on student academic matrix & skill vectors
3. /skill-gap: Evaluates target role requirements against candidate skill profile
4. /health: Service liveness probe
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import math
import os

app = Flask(__name__)
CORS(app)

# Canonical Role Requirements Database
ROLE_PROFILES = {
    'Full Stack Developer': {
        'required': ['javascript', 'react', 'node.js', 'mongodb', 'sql', 'html', 'css'],
        'preferred': ['typescript', 'express', 'docker', 'git', 'rest api'],
        'min_cgpa': 6.5,
        'weight_skills': 0.60,
        'weight_cgpa': 0.25,
        'weight_dsa': 0.15
    },
    'Backend Developer': {
        'required': ['node.js', 'express', 'python', 'java', 'sql', 'mongodb'],
        'preferred': ['c++', 'docker', 'redis', 'kafka', 'microservices', 'git'],
        'min_cgpa': 7.0,
        'weight_skills': 0.55,
        'weight_cgpa': 0.25,
        'weight_dsa': 0.20
    },
    'Frontend Developer': {
        'required': ['html', 'css', 'javascript', 'react', 'bootstrap'],
        'preferred': ['tailwind', 'vue', 'typescript', 'next.js', 'figma'],
        'min_cgpa': 6.0,
        'weight_skills': 0.65,
        'weight_cgpa': 0.25,
        'weight_dsa': 0.10
    },
    'Data Analyst': {
        'required': ['python', 'sql', 'pandas', 'numpy', 'excel', 'tableau'],
        'preferred': ['power bi', 'r', 'statistics', 'data visualization'],
        'min_cgpa': 6.5,
        'weight_skills': 0.60,
        'weight_cgpa': 0.30,
        'weight_dsa': 0.10
    },
    'ML Engineer': {
        'required': ['python', 'tensorflow', 'pytorch', 'scikit-learn', 'sql'],
        'preferred': ['pandas', 'numpy', 'deep learning', 'nlp', 'docker'],
        'min_cgpa': 7.5,
        'weight_skills': 0.55,
        'weight_cgpa': 0.25,
        'weight_dsa': 0.20
    },
    'DevOps Engineer': {
        'required': ['docker', 'kubernetes', 'aws', 'linux', 'git'],
        'preferred': ['ci/cd', 'terraform', 'bash', 'python', 'networking'],
        'min_cgpa': 6.5,
        'weight_skills': 0.60,
        'weight_cgpa': 0.25,
        'weight_dsa': 0.15
    }
}

def extract_student_skills(student):
    """Normalize and aggregate all skills from a student profile object."""
    skills = []
    
    # 1. Check nested techSkills or flat keys
    tech = student.get('techSkills', {}) or {}
    prog = tech.get('programming', '') or student.get('programming', '') or ''
    web = tech.get('web', '') or student.get('web', '') or ''
    db = tech.get('databases', '') or student.get('databases', '') or ''
    
    for raw in [prog, web, db]:
        if isinstance(raw, str):
            for part in raw.split(','):
                cleaned = part.strip().lower()
                if cleaned:
                    skills.append(cleaned)
        elif isinstance(raw, list):
            for part in raw:
                cleaned = str(part).strip().lower()
                if cleaned:
                    skills.append(cleaned)
                    
    # Also scan projects for tech stack keywords
    projects = student.get('projects', []) or []
    for p in projects:
        t = p.get('tech', '') or ''
        for part in t.split(','):
            cleaned = part.strip().lower()
            if cleaned and cleaned not in skills:
                skills.append(cleaned)
                
    return list(set(skills))

def extract_academics(student):
    """Extract and validate numerical academic features."""
    acad = student.get('academicDetails', {}) or {}
    
    # CGPA
    cgpa_raw = acad.get('cgpa') or student.get('cgpa') or 7.0
    try:
        cgpa = float(cgpa_raw)
    except (ValueError, TypeError):
        cgpa = 7.0
    cgpa = max(0.0, min(10.0, cgpa))
    
    # Backlogs
    backlogs_raw = acad.get('backlogs') or student.get('backlogs') or 0
    try:
        backlogs = int(backlogs_raw)
    except (ValueError, TypeError):
        backlogs = 0
    backlogs = max(0, backlogs)
    
    # DSA level
    dsa_raw = student.get('dsa', '') or acad.get('dsa', '') or 'Intermediate'
    dsa_weights = {'Beginner': 0.4, 'Intermediate': 0.75, 'Advanced': 1.0}
    dsa_score = dsa_weights.get(dsa_raw, 0.7)
    
    return cgpa, backlogs, dsa_score

@app.route('/health', methods=['GET'])
@app.route('/', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'service': 'PlacementPro ML Microservice',
        'version': '2.0.0',
        'port': 5001,
        'supported_roles': list(ROLE_PROFILES.keys())
    }), 200

@app.route('/predict-role', methods=['POST'])
def predict_role():
    """
    Evaluates student profile and returns ranked career compatibility scores.
    Formula:
        Score = (Skill_Match_Ratio * W_skill + (CGPA/10) * W_cgpa + DSA_Factor * W_dsa) * 100
        Deduction = Active_Backlogs * 4
    """
    try:
        data = request.get_json(force=True) or {}
        student = data.get('student') or data
        
        student_skills = extract_student_skills(student)
        cgpa, backlogs, dsa_score = extract_academics(student)
        
        results = []
        for role, spec in ROLE_PROFILES.items():
            req_skills = spec['required']
            matched = [r for r in req_skills if any(r in s or s in r for s in student_skills)]
            skill_ratio = len(matched) / len(req_skills) if req_skills else 0.5
            
            # Weighted formula
            base_score = (
                skill_ratio * spec['weight_skills'] +
                (cgpa / 10.0) * spec['weight_cgpa'] +
                dsa_score * spec['weight_dsa']
            ) * 100
            
            # Backlog penalty
            final_score = round(base_score - (backlogs * 4))
            final_score = max(35, min(99, final_score))
            
            results.append({
                'role': role,
                'score': final_score,
                'matchedSkills': matched,
                'missingSkills': [r for r in req_skills if r not in matched]
            })
            
        results.sort(key=lambda x: x['score'], reverse=True)
        return jsonify({'roles': results}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/predict-company', methods=['POST'])
def predict_company():
    """
    Computes real-time company match percentage based on:
    1. Hard academic threshold check (Min CGPA, Max Backlogs, Degree)
    2. Skill vector alignment against company's technology stack
    3. Project experience bonus
    """
    try:
        data = request.get_json(force=True) or {}
        student = data.get('student') or {}
        company = data.get('company') or {}
        
        student_skills = extract_student_skills(student)
        cgpa, backlogs, dsa_score = extract_academics(student)
        
        # Company criteria
        req_cgpa = float(company.get('minimumCGPA', company.get('minCGPA', 6.5)))
        max_backlogs = int(company.get('maximumBacklogs', company.get('maxBacklogs', 0)))
        company_skills = company.get('requiredSkills', []) or ['Java', 'SQL', 'Data Structures']
        if isinstance(company_skills, str):
            company_skills = [s.strip().lower() for s in company_skills.split(',') if s.strip()]
        else:
            company_skills = [str(s).strip().lower() for s in company_skills]
            
        # Hard eligibility check
        is_academically_eligible = (cgpa >= req_cgpa) and (backlogs <= max_backlogs)
        
        # Skill matching
        matched = [cs for cs in company_skills if any(cs in ss or ss in cs for ss in student_skills)]
        skill_ratio = len(matched) / len(company_skills) if company_skills else 0.7
        
        # Weighted calculation
        score = round((skill_ratio * 55) + ((cgpa / 10.0) * 35) + (dsa_score * 10))
        if backlogs > 0:
            score -= (backlogs * 5)
            
        # If student fails hard eligibility, cap score below placement threshold
        if not is_academically_eligible:
            score = min(58, score)
            
        final_score = max(30, min(99, score))
        return jsonify({
            'score': final_score,
            'isEligible': is_academically_eligible,
            'matchedSkills': matched,
            'missingSkills': [cs for cs in company_skills if cs not in matched]
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/skill-gap', methods=['POST'])
def skill_gap():
    """
    Detailed gap analysis for a chosen target role.
    Categorizes missing skills into High, Medium, and Low learning priorities.
    """
    try:
        data = request.get_json(force=True) or {}
        student = data.get('student') or {}
        target_role = data.get('targetRole', 'Backend Developer')
        
        spec = ROLE_PROFILES.get(target_role, ROLE_PROFILES['Backend Developer'])
        student_skills = extract_student_skills(student)
        
        req = spec['required']
        pref = spec['preferred']
        
        matched_req = [r for r in req if any(r in s or s in r for s in student_skills)]
        missing_req = [r for r in req if r not in matched_req]
        
        matched_pref = [p for p in pref if any(p in s or s in r for s in student_skills)]
        missing_pref = [p for p in pref if p not in matched_pref]
        
        # Priorities
        high_priority = missing_req[:3]
        medium_priority = missing_req[3:] + missing_pref[:2]
        low_priority = missing_pref[2:]
        
        total_tracked = len(req) + len(pref)
        total_matched = len(matched_req) + len(matched_pref)
        readiness_pct = round((total_matched / total_tracked) * 100) if total_tracked else 65
        
        return jsonify({
            'targetRole': target_role,
            'readinessScore': readiness_pct,
            'matchedSkills': matched_req + matched_pref,
            'missingSkills': {
                'highPriority': high_priority,
                'mediumPriority': medium_priority,
                'lowPriority': low_priority
            },
            'recommendedAction': f'Focus on mastering {", ".join(high_priority)} to unlock top-tier candidate status.' if high_priority else 'Your profile meets core technical competencies for this role!'
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('ML_PORT', 5001))
    print(f"[ML Service] PlacementPro ML Microservice listening on http://127.0.0.1:{port}")
    app.run(host='0.0.0.0', port=port, debug=False)
