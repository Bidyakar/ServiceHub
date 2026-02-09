const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src', 'data', 'services.json');
const rawData = fs.readFileSync(filePath, 'utf-8');
const data = JSON.parse(rawData);

// Recursive function to update profiles? No, structure is fixed: Category -> SubCategories -> Profiles
data.forEach(category => {
    category.subcategories.forEach(sub => {
        sub.profiles.forEach(profile => {
            if (!profile.reviews) {
                profile.reviews = [];
            }
        });
    });
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2)); // formatted
console.log('Updated services.json with reviews arrays');
