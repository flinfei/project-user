module.exports = {
  '*.{js,jsx,ts,tsx}': ['prettier --write'],
  '*.{md,mdx}': ['prettier --write', 'zhlint'],
  '*.{json}': ['prettier --write'],
};
