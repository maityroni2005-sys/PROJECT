// toSafeArray: tolerate missing/null fields from client payloads
const toSafeArray = (v) => Array.isArray(v) ? v : [];

// compareSkills takes two arrays of skills, normalizes them, and returns matches and gaps
const compareSkills = (studentSkills, requiredSkills) => {
    // Normalize lists to lowercase for accurate matching
    const normalizedStudent = toSafeArray(studentSkills).map(s => String(s).toLowerCase().trim());
    const normalizedRequired = toSafeArray(requiredSkills).map(s => String(s).toLowerCase().trim());
    
    const matched = [];
    const missing = [];
    
    normalizedRequired.forEach(req => {
        if (normalizedStudent.includes(req)) {
            // Find original casing to return
            const originalIndex = normalizedRequired.indexOf(req);
            matched.push(requiredSkills[originalIndex]);
        } else {
            const originalIndex = normalizedRequired.indexOf(req);
            missing.push(requiredSkills[originalIndex]);
        }
    });
    
    return {
        matched,
        missing
    };
};

const generateExplainableScore = (student, company, mlScore) => {
    // 1. Check Hard Eligibility
    const { checkHardEligibility } = require('./eligibilityService');
    const eligibility = checkHardEligibility(student, company);
    
    // 2. Skill Gap Analysis
    // Flatten all student skills (arrays are optional in client payloads)
    const skills = student.technicalSkills || {};
    const studentAllSkills = [
        ...toSafeArray(skills.programmingLanguages),
        ...toSafeArray(skills.webTechnologies),
        ...toSafeArray(skills.databases),
        ...toSafeArray(skills.otherSkills)
    ];
    
    // Flatten company requirements
    const companyReqSkills = [
        ...toSafeArray(company.requiredSkills),
        ...toSafeArray(company.requiredProgrammingLanguages),
        ...toSafeArray(company.requiredWebSkills),
        ...toSafeArray(company.requiredDatabaseSkills)
    ];
    
    const skillComparison = compareSkills(studentAllSkills, companyReqSkills);
    
    // 3. Explainability Logic
    let explanation = `Your estimated Profile Match Score for ${company.companyName || 'this company'} is ${mlScore}%. `;
    
    if (!eligibility.isEligible) {
        explanation += `However, you do not meet the minimum hard requirements due to: ${eligibility.reasons.join(' ')} `;
    } else {
        explanation += `You meet all hard requirements. `;
    }
    
    if (skillComparison.missing.length === 0) {
        explanation += `You have strong technical compatibility and possess all required skills.`;
    } else {
        explanation += `Your score could be improved. You are missing the following critical skills: ${skillComparison.missing.slice(0, 3).join(', ')}.`;
    }

    return {
        companyName: company.companyName,
        category: company.category,
        mlScore: mlScore,
        hardEligibility: {
            status: eligibility.isEligible ? 'PASS' : 'FAIL',
            reasons: eligibility.reasons
        },
        skillAnalysis: {
            matchedSkills: skillComparison.matched,
            missingSkills: skillComparison.missing,
            projectRequirement: company.projectRequired ? ((student.projects || []).length > 0 ? 'PASS' : 'FAIL') : 'NOT REQUIRED'
        },
        explanation
    };
};

module.exports = {
    compareSkills,
    generateExplainableScore
};
