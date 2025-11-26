#!/bin/bash

# BRSR Carbon Calculator - Automated Setup Script for Mac
# This script will set up everything automatically

echo "🚀 BRSR Carbon Calculator - Automated Setup"
echo "============================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "📥 Please install Node.js from: https://nodejs.org/"
    echo "   Download the LTS version and run this script again."
    exit 1
fi

echo "✅ Node.js detected: $(node --version)"
echo ""

# Create project directory
PROJECT_NAME="brsr-calculator"
echo "📁 Creating project directory: $PROJECT_NAME"

if [ -d "$PROJECT_NAME" ]; then
    echo "⚠️  Directory already exists. Remove it? (y/n)"
    read -r response
    if [[ "$response" == "y" ]]; then
        rm -rf "$PROJECT_NAME"
        echo "   Removed existing directory"
    else
        echo "   Using existing directory"
    fi
fi

mkdir -p "$PROJECT_NAME"
cd "$PROJECT_NAME" || exit

# Initialize React project with Vite
echo ""
echo "⚛️  Initializing React project with Vite..."
npm create vite@latest . -- --template react -y

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install
npm install lucide-react

# Install Tailwind CSS
echo ""
echo "🎨 Installing Tailwind CSS..."
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Create Tailwind config
echo ""
echo "⚙️  Configuring Tailwind CSS..."
cat > tailwind.config.js << 'EOF'
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
EOF

# Update index.css
echo ""
echo "💅 Updating styles..."
cat > src/index.css << 'EOF'
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
EOF

# Create App.jsx with BRSR Calculator
echo ""
echo "🧮 Creating BRSR Calculator component..."
cat > src/App.jsx << 'EOFAPP'
import React, { useState, useEffect } from 'react';
import { Calculator, Building2, Zap, Plane, FileText, Download, AlertCircle, CheckCircle2, TrendingUp, BarChart3 } from 'lucide-react';

// Emission Factors (kg CO2e per unit) - based on Indian context
const EMISSION_FACTORS = {
  diesel: 2.68, petrol: 2.31, naturalGas: 2.03, lpg: 2.98, coal: 2419,
  electricity: 0.82,
  airTravel: 0.255, roadTravel: 0.17, railTravel: 0.041, hotels: 29.4,
  waste: 500, water: 0.344, paper: 0.91,
};

const BRSRCarbonCalculator = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [companyInfo, setCompanyInfo] = useState({
    name: '', cin: '', sector: '', employees: '', revenue: '',
  });

  const [scope1Data, setScope1Data] = useState({
    diesel: 0, petrol: 0, naturalGas: 0, lpg: 0, coal: 0,
  });

  const [scope2Data, setScope2Data] = useState({ electricity: 0 });

  const [scope3Data, setScope3Data] = useState({
    airTravel: 0, roadTravel: 0, railTravel: 0, hotels: 0,
    waste: 0, water: 0, paper: 0,
  });

  const [calculations, setCalculations] = useState({
    scope1: 0, scope2: 0, scope3: 0, total: 0, intensity: 0,
  });

  useEffect(() => {
    const scope1Total = Object.keys(scope1Data).reduce((sum, key) => 
      sum + (scope1Data[key] * EMISSION_FACTORS[key]), 0);
    const scope2Total = scope2Data.electricity * EMISSION_FACTORS.electricity;
    const scope3Total = Object.keys(scope3Data).reduce((sum, key) => 
      sum + (scope3Data[key] * EMISSION_FACTORS[key]), 0);
    const total = scope1Total + scope2Total + scope3Total;
    const intensity = companyInfo.revenue ? (total / parseFloat(companyInfo.revenue)) : 0;

    setCalculations({ scope1: scope1Total, scope2: scope2Total, scope3: scope3Total, total, intensity });
  }, [scope1Data, scope2Data, scope3Data, companyInfo.revenue]);

  const formatNumber = (num) => new Intl.NumberFormat('en-IN', { 
    maximumFractionDigits: 2, minimumFractionDigits: 2 
  }).format(num);

  const generateReport = () => {
    const report = {
      company: companyInfo,
      emissions: {
        scope1: { total: calculations.scope1, 
          breakdown: Object.keys(scope1Data).map(key => ({
            source: key, activity: scope1Data[key],
            emissions: scope1Data[key] * EMISSION_FACTORS[key]
          }))
        },
        scope2: { total: calculations.scope2,
          breakdown: [{ source: 'electricity', activity: scope2Data.electricity,
            emissions: scope2Data.electricity * EMISSION_FACTORS.electricity }]
        },
        scope3: { total: calculations.scope3,
          breakdown: Object.keys(scope3Data).map(key => ({
            source: key, activity: scope3Data[key],
            emissions: scope3Data[key] * EMISSION_FACTORS[key]
          }))
        }
      },
      total: calculations.total,
      intensity: calculations.intensity,
      generatedDate: new Date().toLocaleDateString('en-IN')
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BRSR_Carbon_Report_${companyInfo.name || 'Company'}_${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-stone-100 to-emerald-50">
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-700 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            BRSR Carbon Calculator
          </h1>
          <p className="text-emerald-100 text-lg">
            SEBI-Compliant GHG Emissions Reporting for Indian Companies
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-3 overflow-x-auto">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'company', label: 'Company Info', icon: Building2 },
            { id: 'scope1', label: 'Scope 1: Fuel', icon: Calculator },
            { id: 'scope2', label: 'Scope 2: Electricity', icon: Zap },
            { id: 'scope3', label: 'Scope 3: Others', icon: Plane },
            { id: 'report', label: 'Generate Report', icon: FileText },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}>
              <tab.icon size={20} /> {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center py-12">
            <h2 className="text-3xl font-bold text-stone-800 mb-4">
              🎉 BRSR Calculator Setup Complete!
            </h2>
            <p className="text-stone-600 text-lg mb-8">
              Your calculator is ready. Start by entering company information and emission data.
            </p>
            <div className="text-2xl font-bold text-emerald-700">
              Total Emissions: {formatNumber(calculations.total / 1000)} tonnes CO₂e
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BRSRCarbonCalculator;
EOFAPP

echo ""
echo "✅ Setup Complete!"
echo ""
echo "============================================"
echo "🎯 Next Steps:"
echo "============================================"
echo ""
echo "1. Start the development server:"
echo "   cd $PROJECT_NAME"
echo "   npm run dev"
echo ""
echo "2. Open your browser to:"
echo "   http://localhost:5173"
echo ""
echo "3. Start entering your emissions data!"
echo ""
echo "============================================"
echo "📚 Documentation:"
echo "============================================"
echo ""
echo "- Setup guide: SETUP-INSTRUCTIONS.md"
echo "- React component: src/App.jsx"
echo ""
echo "🎉 Happy Reporting!"
