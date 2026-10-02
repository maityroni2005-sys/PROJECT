const checkHardEligibility = (student, company) => {
  let isEligible = true;
  const reasons = [];

  // Check CGPA
  if (student.academicDetails.cgpa < company.minimumCGPA) {
    isEligible = false;
    reasons.push(`CGPA is below the required ${company.minimumCGPA}.`);
  }

  // Check Backlogs
  if (student.academicDetails.backlogs > company.maximumBacklogs) {
    isEligible = false;
    reasons.push(`Number of backlogs exceeds the maximum allowed (${company.maximumBacklogs}).`);
  }

  // Check Branch
  if (company.eligibleBranches && company.eligibleBranches.length > 0) {
    if (!company.eligibleBranches.includes(student.personalDetails.branch)) {
      isEligible = false;
      reasons.push(`Branch ${student.personalDetails.branch} is not eligible. Eligible branches: ${company.eligibleBranches.join(', ')}.`);
    }
  }

  // Check Graduation Year
  if (company.graduationYears && company.graduationYears.length > 0) {
    if (!company.graduationYears.includes(student.personalDetails.graduationYear)) {
      isEligible = false;
      reasons.push(`Graduation year ${student.personalDetails.graduationYear} is not accepted.`);
    }
  }

  return {
    isEligible,
    reasons
  };
};

module.exports = {
  checkHardEligibility
};
