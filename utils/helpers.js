module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return new Date(date).toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    });
  }
};