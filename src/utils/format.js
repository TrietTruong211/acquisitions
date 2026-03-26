export const formatValidationError = (errors) => {
  if (!errors || !errors.issues) {
    return 'Unknown validation error';
  }

  if (Array.isArray(errors.issues)) {
    return errors.issues.map(issue => {
      const path = issue.path ? issue.path.join('.') : 'unknown';
      return `${path}: ${issue.message}`;
    }).join('; ');
  }

  return JSON.stringify(errors);
};