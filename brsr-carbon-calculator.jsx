import React, { useState, useEffect } from 'react';
import { Calculator, Building2, Zap, Plane, FileText, Download, AlertCircle, CheckCircle2, TrendingUp, BarChart3 } from 'lucide-react';

// Emission Factors (kg CO2e per unit) - based on Indian context
const EMISSION_FACTORS = {
  // Scope 1 - Direct emissions
  diesel: 2.68,        // kg CO2e per liter
  petrol: 2.31,        // kg CO2e per liter
  naturalGas: 2.03,    // kg CO2e per m³
  lpg: 2.98,           // kg CO2e per kg
  coal: 2419,          // kg CO2e per tonne
  
  // Scope 2 - Electricity (India grid average)
  electricity: 0.82,   // kg CO2e per kWh
  
  // Scope 3 - Other indirect emissions
  airTravel: 0.255,    // kg CO2e per passenger-km
  roadTravel: 0.17,    // kg CO2e per km
  railTravel: 0.041,   // kg CO2e per passenger-km
  hotels: 29.4,        // kg CO2e per room-night
  waste: 500,          // kg CO2e per tonne
  water: 0.344,        // kg CO2e per kL
  paper: 0.91,         // kg CO2e per kg
};

const BRSRCarbonCalculator = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    cin: '',
    sector: '',
    employees: '',
    revenue: '',
  });

  const [scope1Data, setScope1Data] = useState({
    diesel: 0,
    petrol: 0,
    naturalGas: 0,
    lpg: 0,
    coal: 0,
  });

  const [scope2Data, setScope2Data] = useState({
    electricity: 0,
  });

  const [scope3Data, setScope3Data] = useState({
    airTravel: 0,
    roadTravel: 0,
    railTravel: 0,
    hotels: 0,
    waste: 0,
    water: 0,
    paper: 0,
  });

  const [calculations, setCalculations] = useState({
    scope1: 0,
    scope2: 0,
    scope3: 0,
    total: 0,
    intensity: 0,
  });

  // Calculate emissions
  useEffect(() => {
    const scope1Total = Object.keys(scope1Data).reduce((sum, key) => {
      return sum + (scope1Data[key] * EMISSION_FACTORS[key]);
    }, 0);

    const scope2Total = scope2Data.electricity * EMISSION_FACTORS.electricity;

    const scope3Total = Object.keys(scope3Data).reduce((sum, key) => {
      return sum + (scope3Data[key] * EMISSION_FACTORS[key]);
    }, 0);

    const total = scope1Total + scope2Total + scope3Total;
    const intensity = companyInfo.revenue ? (total / parseFloat(companyInfo.revenue)) : 0;

    setCalculations({
      scope1: scope1Total,
      scope2: scope2Total,
      scope3: scope3Total,
      total: total,
      intensity: intensity,
    });
  }, [scope1Data, scope2Data, scope3Data, companyInfo.revenue]);

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN', { 
      maximumFractionDigits: 2,
      minimumFractionDigits: 2 
    }).format(num);
  };

  const generateReport = () => {
    const report = {
      company: companyInfo,
      emissions: {
        scope1: {
          total: calculations.scope1,
          breakdown: Object.keys(scope1Data).map(key => ({
            source: key,
            activity: scope1Data[key],
            emissions: scope1Data[key] * EMISSION_FACTORS[key]
          }))
        },
        scope2: {
          total: calculations.scope2,
          breakdown: [{
            source: 'electricity',
            activity: scope2Data.electricity,
            emissions: scope2Data.electricity * EMISSION_FACTORS.electricity
          }]
        },
        scope3: {
          total: calculations.scope3,
          breakdown: Object.keys(scope3Data).map(key => ({
            source: key,
            activity: scope3Data[key],
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

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
        activeTab === id
          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
      }`}
    >
      <Icon size={20} />
      {label}
    </button>
  );

  const InputField = ({ label, value, onChange, unit, info }) => (
    <div className="mb-4">
      <label className="block text-stone-700 font-medium mb-2 flex items-center gap-2">
        {label}
        {info && (
          <span className="text-xs text-stone-500 font-normal">({info})</span>
        )}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={value}
          onChange={onChange}
          min="0"
          step="0.01"
          className="flex-1 px-4 py-3 border-2 border-stone-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
          placeholder="0.00"
        />
        {unit && (
          <span className="text-stone-600 font-medium px-3 py-3 bg-stone-100 rounded-lg">
            {unit}
          </span>
        )}
      </div>
    </div>
  );

  const EmissionCard = ({ title, value, icon: Icon, color, percentage }) => (
    <div className={`bg-gradient-to-br ${color} p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-transform`}>
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-white bg-opacity-20 rounded-xl">
          <Icon size={28} className="text-white" />
        </div>
        {percentage && (
          <div className="text-white text-sm font-medium bg-white bg-opacity-20 px-3 py-1 rounded-full">
            {percentage}%
          </div>
        )}
      </div>
      <h3 className="text-white text-opacity-90 text-sm font-medium mb-2">{title}</h3>
      <p className="text-white text-3xl font-bold">{formatNumber(value)}</p>
      <p className="text-white text-opacity-80 text-xs mt-1">tonnes CO₂e</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-stone-100 to-emerald-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-700 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
                BRSR Carbon Calculator
              </h1>
              <p className="text-emerald-100 text-lg">
                SEBI-Compliant GHG Emissions Reporting for Indian Companies
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs text-emerald-200 mb-1">TOTAL EMISSIONS</div>
                <div className="text-3xl font-bold">{formatNumber(calculations.total / 1000)}</div>
                <div className="text-xs text-emerald-200">tonnes CO₂e</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-3 overflow-x-auto pb-2">
          <TabButton id="dashboard" label="Dashboard" icon={BarChart3} />
          <TabButton id="company" label="Company Info" icon={Building2} />
          <TabButton id="scope1" label="Scope 1: Fuel" icon={Calculator} />
          <TabButton id="scope2" label="Scope 2: Electricity" icon={Zap} />
          <TabButton id="scope3" label="Scope 3: Others" icon={Plane} />
          <TabButton id="report" label="Generate Report" icon={FileText} />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-stone-200">
              <h2 className="text-2xl font-bold text-stone-800 mb-6 flex items-center gap-3">
                <TrendingUp className="text-emerald-600" />
                Emissions Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <EmissionCard
                  title="Scope 1: Direct Emissions"
                  value={calculations.scope1 / 1000}
                  icon={Calculator}
                  color="from-orange-500 to-red-500"
                  percentage={calculations.total ? Math.round((calculations.scope1 / calculations.total) * 100) : 0}
                />
                <EmissionCard
                  title="Scope 2: Electricity"
                  value={calculations.scope2 / 1000}
                  icon={Zap}
                  color="from-blue-500 to-indigo-500"
                  percentage={calculations.total ? Math.round((calculations.scope2 / calculations.total) * 100) : 0}
                />
                <EmissionCard
                  title="Scope 3: Indirect"
                  value={calculations.scope3 / 1000}
                  icon={Plane}
                  color="from-purple-500 to-pink-500"
                  percentage={calculations.total ? Math.round((calculations.scope3 / calculations.total) * 100) : 0}
                />
                <EmissionCard
                  title="Emission Intensity"
                  value={calculations.intensity}
                  icon={BarChart3}
                  color="from-emerald-500 to-teal-500"
                />
              </div>
            </div>

            {/* Compliance Checklist */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-stone-200">
              <h2 className="text-2xl font-bold text-stone-800 mb-6 flex items-center gap-3">
                <CheckCircle2 className="text-emerald-600" />
                BRSR Compliance Checklist
              </h2>
              <div className="space-y-3">
                {[
                  { label: 'Company Information Provided', completed: companyInfo.name && companyInfo.cin },
                  { label: 'Scope 1 Emissions Calculated', completed: calculations.scope1 > 0 },
                  { label: 'Scope 2 Emissions Calculated', completed: calculations.scope2 > 0 },
                  { label: 'Scope 3 Emissions Calculated', completed: calculations.scope3 > 0 },
                  { label: 'Emission Intensity Calculated', completed: calculations.intensity > 0 },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-stone-50 rounded-lg">
                    {item.completed ? (
                      <CheckCircle2 className="text-emerald-600 flex-shrink-0" size={24} />
                    ) : (
                      <AlertCircle className="text-orange-500 flex-shrink-0" size={24} />
                    )}
                    <span className={`font-medium ${item.completed ? 'text-stone-700' : 'text-stone-500'}`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Company Info */}
        {activeTab === 'company' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-stone-200">
            <h2 className="text-2xl font-bold text-stone-800 mb-6 flex items-center gap-3">
              <Building2 className="text-emerald-600" />
              Company Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Company Name"
                value={companyInfo.name}
                onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
              />
              <InputField
                label="CIN Number"
                value={companyInfo.cin}
                onChange={(e) => setCompanyInfo({ ...companyInfo, cin: e.target.value })}
              />
              <InputField
                label="Business Sector"
                value={companyInfo.sector}
                onChange={(e) => setCompanyInfo({ ...companyInfo, sector: e.target.value })}
              />
              <InputField
                label="Number of Employees"
                value={companyInfo.employees}
                onChange={(e) => setCompanyInfo({ ...companyInfo, employees: e.target.value })}
              />
              <InputField
                label="Annual Revenue"
                value={companyInfo.revenue}
                onChange={(e) => setCompanyInfo({ ...companyInfo, revenue: e.target.value })}
                unit="₹ Crores"
                info="For emission intensity calculation"
              />
            </div>
          </div>
        )}

        {/* Scope 1 */}
        {activeTab === 'scope1' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-stone-200">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-stone-800 flex items-center gap-3 mb-2">
                <Calculator className="text-orange-600" />
                Scope 1: Direct Emissions (Fuel Burned)
              </h2>
              <p className="text-stone-600">
                Enter fuel consumption data for direct emissions from sources owned or controlled by your company.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Diesel Consumption"
                value={scope1Data.diesel}
                onChange={(e) => setScope1Data({ ...scope1Data, diesel: parseFloat(e.target.value) || 0 })}
                unit="Liters"
                info={`EF: ${EMISSION_FACTORS.diesel} kg CO₂e/L`}
              />
              <InputField
                label="Petrol Consumption"
                value={scope1Data.petrol}
                onChange={(e) => setScope1Data({ ...scope1Data, petrol: parseFloat(e.target.value) || 0 })}
                unit="Liters"
                info={`EF: ${EMISSION_FACTORS.petrol} kg CO₂e/L`}
              />
              <InputField
                label="Natural Gas Consumption"
                value={scope1Data.naturalGas}
                onChange={(e) => setScope1Data({ ...scope1Data, naturalGas: parseFloat(e.target.value) || 0 })}
                unit="m³"
                info={`EF: ${EMISSION_FACTORS.naturalGas} kg CO₂e/m³`}
              />
              <InputField
                label="LPG Consumption"
                value={scope1Data.lpg}
                onChange={(e) => setScope1Data({ ...scope1Data, lpg: parseFloat(e.target.value) || 0 })}
                unit="kg"
                info={`EF: ${EMISSION_FACTORS.lpg} kg CO₂e/kg`}
              />
              <InputField
                label="Coal Consumption"
                value={scope1Data.coal}
                onChange={(e) => setScope1Data({ ...scope1Data, coal: parseFloat(e.target.value) || 0 })}
                unit="Tonnes"
                info={`EF: ${EMISSION_FACTORS.coal} kg CO₂e/tonne`}
              />
            </div>
            <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border-2 border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-stone-600 font-medium mb-1">Scope 1 Total Emissions</p>
                  <p className="text-4xl font-bold text-orange-700">{formatNumber(calculations.scope1 / 1000)}</p>
                  <p className="text-stone-600 text-sm mt-1">tonnes CO₂e</p>
                </div>
                <Calculator className="text-orange-600" size={48} />
              </div>
            </div>
          </div>
        )}

        {/* Scope 2 */}
        {activeTab === 'scope2' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-stone-200">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-stone-800 flex items-center gap-3 mb-2">
                <Zap className="text-blue-600" />
                Scope 2: Indirect Emissions (Electricity)
              </h2>
              <p className="text-stone-600">
                Enter electricity consumption data for emissions from purchased electricity.
              </p>
            </div>
            <div className="max-w-xl">
              <InputField
                label="Electricity Consumption"
                value={scope2Data.electricity}
                onChange={(e) => setScope2Data({ electricity: parseFloat(e.target.value) || 0 })}
                unit="kWh"
                info={`EF: ${EMISSION_FACTORS.electricity} kg CO₂e/kWh (India Grid)`}
              />
            </div>
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-stone-600 font-medium mb-1">Scope 2 Total Emissions</p>
                  <p className="text-4xl font-bold text-blue-700">{formatNumber(calculations.scope2 / 1000)}</p>
                  <p className="text-stone-600 text-sm mt-1">tonnes CO₂e</p>
                </div>
                <Zap className="text-blue-600" size={48} />
              </div>
            </div>
          </div>
        )}

        {/* Scope 3 */}
        {activeTab === 'scope3' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-stone-200">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-stone-800 flex items-center gap-3 mb-2">
                <Plane className="text-purple-600" />
                Scope 3: Other Indirect Emissions
              </h2>
              <p className="text-stone-600">
                Enter data for emissions from travel, suppliers, waste, and other indirect sources.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Air Travel"
                value={scope3Data.airTravel}
                onChange={(e) => setScope3Data({ ...scope3Data, airTravel: parseFloat(e.target.value) || 0 })}
                unit="passenger-km"
                info={`EF: ${EMISSION_FACTORS.airTravel} kg CO₂e/pass-km`}
              />
              <InputField
                label="Road Travel"
                value={scope3Data.roadTravel}
                onChange={(e) => setScope3Data({ ...scope3Data, roadTravel: parseFloat(e.target.value) || 0 })}
                unit="km"
                info={`EF: ${EMISSION_FACTORS.roadTravel} kg CO₂e/km`}
              />
              <InputField
                label="Rail Travel"
                value={scope3Data.railTravel}
                onChange={(e) => setScope3Data({ ...scope3Data, railTravel: parseFloat(e.target.value) || 0 })}
                unit="passenger-km"
                info={`EF: ${EMISSION_FACTORS.railTravel} kg CO₂e/pass-km`}
              />
              <InputField
                label="Hotel Stays"
                value={scope3Data.hotels}
                onChange={(e) => setScope3Data({ ...scope3Data, hotels: parseFloat(e.target.value) || 0 })}
                unit="room-nights"
                info={`EF: ${EMISSION_FACTORS.hotels} kg CO₂e/room-night`}
              />
              <InputField
                label="Waste Generated"
                value={scope3Data.waste}
                onChange={(e) => setScope3Data({ ...scope3Data, waste: parseFloat(e.target.value) || 0 })}
                unit="Tonnes"
                info={`EF: ${EMISSION_FACTORS.waste} kg CO₂e/tonne`}
              />
              <InputField
                label="Water Consumption"
                value={scope3Data.water}
                onChange={(e) => setScope3Data({ ...scope3Data, water: parseFloat(e.target.value) || 0 })}
                unit="kL"
                info={`EF: ${EMISSION_FACTORS.water} kg CO₂e/kL`}
              />
              <InputField
                label="Paper Consumption"
                value={scope3Data.paper}
                onChange={(e) => setScope3Data({ ...scope3Data, paper: parseFloat(e.target.value) || 0 })}
                unit="kg"
                info={`EF: ${EMISSION_FACTORS.paper} kg CO₂e/kg`}
              />
            </div>
            <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-stone-600 font-medium mb-1">Scope 3 Total Emissions</p>
                  <p className="text-4xl font-bold text-purple-700">{formatNumber(calculations.scope3 / 1000)}</p>
                  <p className="text-stone-600 text-sm mt-1">tonnes CO₂e</p>
                </div>
                <Plane className="text-purple-600" size={48} />
              </div>
            </div>
          </div>
        )}

        {/* Report */}
        {activeTab === 'report' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-stone-200">
            <h2 className="text-2xl font-bold text-stone-800 mb-6 flex items-center gap-3">
              <FileText className="text-emerald-600" />
              Generate BRSR Compliance Report
            </h2>
            
            <div className="space-y-6">
              {/* Summary */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border-2 border-emerald-200">
                <h3 className="text-xl font-bold text-stone-800 mb-4">Emissions Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-stone-600 text-sm mb-1">Company Name</p>
                    <p className="font-bold text-stone-800">{companyInfo.name || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-stone-600 text-sm mb-1">CIN Number</p>
                    <p className="font-bold text-stone-800">{companyInfo.cin || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-stone-600 text-sm mb-1">Total Emissions</p>
                    <p className="font-bold text-emerald-700 text-2xl">{formatNumber(calculations.total / 1000)} tonnes CO₂e</p>
                  </div>
                  <div>
                    <p className="text-stone-600 text-sm mb-1">Emission Intensity</p>
                    <p className="font-bold text-teal-700 text-2xl">{formatNumber(calculations.intensity)} kg CO₂e/₹Cr</p>
                  </div>
                </div>
              </div>

              {/* Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-orange-50 p-5 rounded-xl border-2 border-orange-200">
                  <p className="text-stone-600 font-medium mb-2">Scope 1 (Direct)</p>
                  <p className="text-3xl font-bold text-orange-700">{formatNumber(calculations.scope1 / 1000)}</p>
                  <p className="text-stone-600 text-sm">tonnes CO₂e</p>
                </div>
                <div className="bg-blue-50 p-5 rounded-xl border-2 border-blue-200">
                  <p className="text-stone-600 font-medium mb-2">Scope 2 (Electricity)</p>
                  <p className="text-3xl font-bold text-blue-700">{formatNumber(calculations.scope2 / 1000)}</p>
                  <p className="text-stone-600 text-sm">tonnes CO₂e</p>
                </div>
                <div className="bg-purple-50 p-5 rounded-xl border-2 border-purple-200">
                  <p className="text-stone-600 font-medium mb-2">Scope 3 (Indirect)</p>
                  <p className="text-3xl font-bold text-purple-700">{formatNumber(calculations.scope3 / 1000)}</p>
                  <p className="text-stone-600 text-sm">tonnes CO₂e</p>
                </div>
              </div>

              {/* Download Button */}
              <button
                onClick={generateReport}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl"
              >
                <Download size={24} />
                Download BRSR Report (JSON)
              </button>

              <div className="bg-amber-50 p-4 rounded-xl border-2 border-amber-200 flex items-start gap-3">
                <AlertCircle className="text-amber-600 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-stone-700 font-medium mb-1">Report Format</p>
                  <p className="text-stone-600 text-sm">
                    The report is downloaded in JSON format, which can be imported into your BRSR reporting system or converted to Excel/PDF as needed. All emission factors and calculations are included for audit purposes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-stone-800 text-stone-300 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm">
            Built for SEBI BRSR Compliance | Emission Factors based on GHG Protocol & India-specific data
          </p>
          <p className="text-xs mt-2 text-stone-400">
            Always verify emission factors with latest official sources for regulatory submissions
          </p>
        </div>
      </div>
    </div>
  );
};

export default BRSRCarbonCalculator;