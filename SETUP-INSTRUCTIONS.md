# BRSR Carbon Calculator - Setup Guide for Mac

## 🚀 Quick Start (5 Minutes)

### Prerequisites
You need Node.js installed on your Mac. Check if you have it:
```bash
node --version
```

If not installed, download from: https://nodejs.org/ (choose LTS version)

---

## 📦 Step-by-Step Installation

### Step 1: Create Project Folder
```bash
# Open Terminal and run:
mkdir brsr-calculator
cd brsr-calculator
```

### Step 2: Initialize React Project
```bash
# Create a new React app using Vite (fastest method)
npm create vite@latest . -- --template react

# When prompted:
# - Select: React
# - Select: JavaScript
```

### Step 3: Install Dependencies
```bash
# Install required packages
npm install
npm install lucide-react
```

### Step 4: Replace App Component
```bash
# Remove the default App.jsx
rm src/App.jsx

# Copy the BRSR calculator file you downloaded into src/
# Rename it to App.jsx
```

**Or manually:**
1. Download the `brsr-carbon-calculator.jsx` file
2. Open it in any text editor
3. Copy all the content
4. Navigate to `brsr-calculator/src/App.jsx`
5. Delete everything and paste the copied content
6. Save the file

### Step 5: Update Main CSS (Optional but Recommended)
Open `src/index.css` and replace with:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### Step 6: Install Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Open `tailwind.config.js` and replace with:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Step 7: Run the Application
```bash
npm run dev
```

You should see output like:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 8: Open in Browser
Click the link or open your browser and go to:
```
http://localhost:5173/
```

---

## 🎯 Features

### ✅ What You Can Do:

1. **Company Information**
   - Enter company details (Name, CIN, Sector, etc.)
   - Required for compliance reporting

2. **Scope 1 - Direct Emissions**
   - Diesel consumption
   - Petrol consumption
   - Natural gas
   - LPG
   - Coal
   - Auto-calculates emissions using Indian emission factors

3. **Scope 2 - Electricity**
   - Electricity consumption
   - Uses India grid emission factor (0.82 kg CO₂e/kWh)

4. **Scope 3 - Indirect Emissions**
   - Air travel
   - Road travel
   - Rail travel
   - Hotel stays
   - Waste
   - Water consumption
   - Paper usage

5. **Dashboard**
   - Visual overview of all emissions
   - Percentage breakdown by scope
   - Emission intensity calculation
   - Compliance checklist

6. **Generate Report**
   - Download audit-ready JSON report
   - Complete breakdown of all emissions
   - Ready for SEBI BRSR submission

---

## 📊 Emission Factors Used

All emission factors are based on:
- GHG Protocol standards
- Indian grid averages
- IPCC guidelines
- BRSR reporting requirements

| Source | Unit | Emission Factor (kg CO₂e) |
|--------|------|--------------------------|
| Diesel | per liter | 2.68 |
| Petrol | per liter | 2.31 |
| Natural Gas | per m³ | 2.03 |
| LPG | per kg | 2.98 |
| Coal | per tonne | 2,419 |
| Electricity (India) | per kWh | 0.82 |
| Air Travel | per passenger-km | 0.255 |
| Road Travel | per km | 0.17 |
| Rail Travel | per passenger-km | 0.041 |

---

## 🔧 Troubleshooting

### Issue: "command not found: npm"
**Solution:** Install Node.js from https://nodejs.org/

### Issue: Port 5173 already in use
**Solution:** Kill the process or use a different port:
```bash
npm run dev -- --port 3000
```

### Issue: Tailwind styles not applying
**Solution:** Make sure you:
1. Installed Tailwind: `npm install -D tailwindcss`
2. Created tailwind.config.js
3. Updated src/index.css with @tailwind directives
4. Restarted the dev server

### Issue: Icons not showing
**Solution:** Make sure lucide-react is installed:
```bash
npm install lucide-react
```

---

## 📝 Usage Tips

1. **Start with Company Info**: Fill in your company details first
2. **Work Through Scopes**: Complete Scope 1, 2, and 3 in order
3. **Check Dashboard**: Review your emissions breakdown
4. **Verify Compliance**: Check the compliance checklist
5. **Generate Report**: Download your BRSR-ready report

---

## 🎨 Customization

### Change Colors
Edit the gradient colors in the component:
```javascript
// Find and replace color classes like:
from-emerald-600 to-teal-600
// with your preferred colors
```

### Add More Emission Sources
Add to the `EMISSION_FACTORS` object:
```javascript
const EMISSION_FACTORS = {
  // ... existing factors
  yourNewSource: 1.23, // kg CO2e per unit
};
```

---

## 📱 Building for Production

When ready to deploy:

```bash
# Build optimized production version
npm run build

# Preview production build
npm run preview
```

The build files will be in the `dist/` folder.

---

## 🆘 Need Help?

Common issues:
- Make sure Node.js version is 16 or higher
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`
- Check that all files are in the correct location

---

## 📋 Checklist

- [ ] Node.js installed
- [ ] Project folder created
- [ ] React app initialized with Vite
- [ ] Dependencies installed (lucide-react, tailwindcss)
- [ ] App.jsx replaced with calculator code
- [ ] Tailwind configured
- [ ] Development server running
- [ ] Browser opened to localhost:5173

---

## 🎉 You're Ready!

Your BRSR Carbon Calculator is now running on your Mac. Start entering your emissions data and generate SEBI-compliant reports!

For updates or issues, check the latest SEBI BRSR guidelines at: https://www.sebi.gov.in/
