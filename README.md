# BRSR
**THEME -Solving problems for corporate as a whole**

The new SEBI BRSR mandate requires mandatory GHG emissions data For 50M+
Indian MSMEs, manual calculation is complex, error-prone, and too expensive.

Abstract : SEBI has mandated that the top 500
listed companies disclose their carbon footprint
and sustainability data in compliance with the
Business Responsibility and Sustainability
Reporting (BRSR) framework


objective:-To turn the complex, manual, and
costly process of calculating GHG (carbon)
emissions for BRSR compliance into a simple,
one-click, audit-ready data output.


Automating BRSR Carbon
Reporting for Indian Companies



# BRSR Carbon Calculator - Methodology

## Overview

The BRSR Carbon Calculator automates the calculation of Greenhouse Gas (GHG) emissions for Indian companies to comply with SEBI's Business Responsibility and Sustainability Reporting (BRSR) framework.

---

## Table of Contents

1. [Problem Statement](#problem-statement)
2. [Solution Approach](#solution-approach)
3. [Calculation Methodology](#calculation-methodology)
4. [Step-by-Step Process](#step-by-step-process)
5. [Technical Implementation](#technical-implementation)
6. [Data Requirements](#data-requirements)
7. [Output Format](#output-format)

---

## Problem Statement

### The SEBI Mandate

- **Scope**: Top 1000 listed companies in India must disclose carbon footprint data
- **Additional Coverage**: 
  - MSMEs supplying to large corporations (e.g., Tata, Reliance)
  - MSMEs exporting to international markets
- **Challenge**: Manual GHG calculation is complex, error-prone, and expensive

### Current Issues

1. **Complexity**: Understanding GHG Protocol and emission scopes
2. **Cost**: Hiring consultants costs ₹50,000 - ₹5,00,000+
3. **Time**: Manual calculations take weeks
4. **Accuracy**: High risk of errors in manual processes
5. **Compliance**: Audit-grade reports difficult to produce

---

## Solution Approach

### Our Objective

**Transform complex GHG emission calculations into simple, one-click, audit-ready outputs**

### Key Features

- ✅ Automated calculations across all 3 scopes
- ✅ SEBI BRSR-compliant reporting
- ✅ Audit-grade accuracy
- ✅ Affordable for MSMEs, scalable for corporations
- ✅ One-click report generation

---

## Calculation Methodology

### The GHG Protocol - Three Scopes

Our calculator follows the internationally recognized GHG Protocol standard:

#### **Scope 1: Direct Emissions**
- **Definition**: Emissions from sources owned or controlled by the company
- **Examples**:
  - Company vehicles (diesel, petrol, CNG)
  - On-site fuel combustion (generators, boilers)
  - Manufacturing processes
  - Refrigerant leakage

#### **Scope 2: Indirect Emissions (Electricity)**
- **Definition**: Emissions from purchased electricity, heat, steam, or cooling
- **Examples**:
  - Grid electricity consumption
  - Purchased heating/cooling
  - Office and facility electricity

#### **Scope 3: Other Indirect Emissions**
- **Definition**: All other indirect emissions in the value chain
- **Examples**:
  - Business travel (flights, trains, taxis)
  - Employee commuting
  - Supply chain emissions
  - Waste disposal
  - Product transportation

### Core Calculation Formula

```
Total CO₂e = Activity Data × Emission Factor
```

Where:
- **Activity Data**: Quantity of activity (liters of fuel, kWh of electricity, km traveled)
- **Emission Factor**: CO₂ equivalent per unit of activity (kg CO₂e per liter, per kWh, per km)
- **CO₂e**: Carbon Dioxide equivalent (includes CO₂, CH₄, N₂O, and other GHGs)

### Emission Intensity Calculation

```
Emission Intensity = Total Emissions / Metric
```

Common metrics:
- Per unit of revenue (tonnes CO₂e per ₹ Crore)
- Per employee (tonnes CO₂e per employee)
- Per unit produced (tonnes CO₂e per unit)

---

## Step-by-Step Process

### Step 1: Company Information Input

**User provides basic company details:**

1. Company name and registration number
2. Reporting period (fiscal year)
3. Industry sector
4. Number of employees
5. Annual revenue
6. Production units (if applicable)

**System Action:**
- Creates company profile
- Initializes data collection templates

---

### Step 2: Scope 1 Data Collection

**User inputs direct emission sources:**

#### 2.1 Fuel Consumption
- Diesel (liters)
- Petrol (liters)
- Natural Gas (cubic meters)
- LPG (kg)
- Coal (tonnes)

#### 2.2 Calculation Process
```
For each fuel type:
1. User enters: Quantity consumed
2. System retrieves: India-specific emission factor
3. System calculates: Quantity × Emission Factor = CO₂e
4. System aggregates: Total Scope 1 emissions
```

**Example:**
```
Diesel consumed: 10,000 liters
Emission factor: 2.68 kg CO₂e/liter (India standard)
Scope 1 (Diesel) = 10,000 × 2.68 = 26,800 kg CO₂e = 26.8 tonnes CO₂e
```

---

### Step 3: Scope 2 Data Collection

**User inputs electricity consumption:**

#### 3.1 Electricity Data
- Total kWh consumed (from electricity bills)
- State/region (for grid-specific emission factors)

#### 3.2 Calculation Process
```
1. User enters: Total kWh consumed
2. System identifies: State-specific grid emission factor
3. System calculates: kWh × Grid Factor = CO₂e
```

**Example:**
```
Electricity consumed: 50,000 kWh
Grid emission factor: 0.82 kg CO₂e/kWh (Delhi grid)
Scope 2 = 50,000 × 0.82 = 41,000 kg CO₂e = 41 tonnes CO₂e
```

---

### Step 4: Scope 3 Data Collection

**User inputs indirect emission sources:**

#### 4.1 Business Travel
- Air travel (km by class)
- Rail travel (km)
- Taxi/hired vehicles (km)

#### 4.2 Employee Commuting
- Number of employees
- Average commute distance
- Mode of transport distribution

#### 4.3 Supply Chain
- Purchased goods and services
- Transportation and distribution

#### 4.4 Calculation Process
```
For each category:
1. User enters: Activity data
2. System retrieves: Category-specific emission factor
3. System calculates: Activity × Factor = CO₂e
4. System aggregates: Total Scope 3 emissions
```

**Example (Air Travel):**
```
Domestic flights: 10,000 km (economy class)
Emission factor: 0.133 kg CO₂e/km
Scope 3 (Air) = 10,000 × 0.133 = 1,330 kg CO₂e = 1.33 tonnes CO₂e
```

---

### Step 5: Data Validation

**System automatically validates:**

1. ✅ Check for missing mandatory fields
2. ✅ Validate numerical entries (no negative values)
3. ✅ Cross-check against industry benchmarks
4. ✅ Flag unusual values for review
5. ✅ Ensure completeness of data

**User Action:**
- Review flagged items
- Correct or confirm unusual values
- Add explanatory notes if needed

---

### Step 6: Calculation & Aggregation

**System performs calculations:**

```
Step 6.1: Calculate individual emission sources
Step 6.2: Aggregate by scope
  - Total Scope 1 = Σ (All direct emissions)
  - Total Scope 2 = Σ (All electricity emissions)
  - Total Scope 3 = Σ (All other indirect emissions)

Step 6.3: Calculate totals
  - Total Emissions = Scope 1 + Scope 2 + Scope 3

Step 6.4: Calculate intensity ratios
  - Emissions per revenue = Total / Annual Revenue
  - Emissions per employee = Total / Number of Employees
  - Emissions per unit = Total / Production Units
```

---

### Step 7: Report Generation

**System generates BRSR-compliant report:**

#### 7.1 Report Sections

1. **Executive Summary**
   - Total emissions by scope
   - Year-over-year comparison (if available)
   - Key insights

2. **Detailed Emissions Breakdown**
   - Scope 1: By fuel type
   - Scope 2: By facility/location
   - Scope 3: By category

3. **Emission Intensity Metrics**
   - Per unit revenue
   - Per employee
   - Per production unit

4. **Compliance Checklist**
   - ✅ Company information provided
   - ✅ Scope 1 emissions calculated
   - ✅ Scope 2 emissions calculated
   - ✅ Scope 3 emissions calculated
   - ✅ Emission intensity calculated

5. **Methodology & Assumptions**
   - Emission factors used
   - Data sources
   - Calculation approach
   - Limitations and exclusions

#### 7.2 Output Formats
- PDF report (audit-ready)
- Excel spreadsheet (detailed data)
- Dashboard view (interactive)

---

### Step 8: Review & Export

**User actions:**

1. Review generated report
2. Verify all calculations
3. Add comments or notes
4. Export final report
5. Submit to auditors/SEBI as required

---

## Technical Implementation

### System Architecture

```
Frontend (React + JSX)
    ↓
User Input Forms
    ↓
Data Validation Layer
    ↓
Calculation Engine (JavaScript)
    ↓
Emission Factor Database
    ↓
Report Generator
    ↓
Output (PDF/Excel/Dashboard)
```

### Technology Stack

- **Frontend**: React with JSX
- **Build Tool**: Vite
- **Package Manager**: npm
- **Styling**: CSS/Tailwind
- **State Management**: React Hooks
- **PDF Generation**: jsPDF / PDFKit
- **Excel Export**: SheetJS (xlsx)

### Key Components

#### 1. Input Forms
```javascript
// Example: Scope 1 Fuel Input
<FuelCalculator>
  - Diesel input field
  - Petrol input field
  - Natural gas input field
  - Auto-calculation on change
</FuelCalculator>
```

#### 2. Calculation Engine
```javascript
// Example: Calculate Scope 1
function calculateScope1(fuelData) {
  const emissionFactors = {
    diesel: 2.68,  // kg CO₂e per liter
    petrol: 2.31,  // kg CO₂e per liter
    naturalGas: 2.03  // kg CO₂e per m³
  };
  
  let totalEmissions = 0;
  
  for (const [fuel, quantity] of Object.entries(fuelData)) {
    totalEmissions += quantity * emissionFactors[fuel];
  }
  
  return totalEmissions / 1000; // Convert to tonnes
}
```

#### 3. Report Generator
```javascript
// Generate BRSR-compliant PDF report
function generateReport(companyData, emissionsData) {
  const report = {
    summary: calculateSummary(emissionsData),
    details: formatDetails(emissionsData),
    compliance: checkCompliance(companyData, emissionsData)
  };
  
  return createPDF(report);
}
```

---

## Data Requirements

### Minimum Required Data

#### Scope 1
- Fuel consumption records (monthly/yearly)
- Fuel types and quantities

#### Scope 2
- Electricity bills (kWh consumed)
- Location/state information

#### Scope 3
- Travel records (km traveled by mode)
- Employee count and commute data
- Supplier/logistics data (if available)

### Data Sources

1. **Utility Bills**: Electricity consumption
2. **Fuel Purchase Records**: Diesel, petrol, gas receipts
3. **Travel Records**: Employee travel logs
4. **HR Records**: Employee count, commute surveys
5. **Logistics Data**: Transportation records

---

## Output Format

### BRSR Report Structure

```
1. Company Profile
   - Name, sector, reporting period
   
2. Emissions Summary
   - Total emissions: X tonnes CO₂e
   - Scope 1: Y tonnes CO₂e
   - Scope 2: Z tonnes CO₂e
   - Scope 3: W tonnes CO₂e
   
3. Emission Intensity
   - Per ₹ Crore revenue: A tonnes CO₂e
   - Per employee: B tonnes CO₂e
   
4. Detailed Breakdown
   - Tables and charts by scope
   
5. Methodology
   - Emission factors used
   - Calculation approach
   
6. Compliance Statement
   - Adherence to SEBI BRSR norms
```

### Sample Output

```
═══════════════════════════════════════════════════════
BRSR CARBON FOOTPRINT REPORT
═══════════════════════════════════════════════════════

Company: ABC Manufacturing Ltd.
Reporting Period: FY 2024-25
Sector: Manufacturing

───────────────────────────────────────────────────────
EMISSIONS SUMMARY
───────────────────────────────────────────────────────

Total Emissions: 150.00 tonnes CO₂e

Scope 1 (Direct):           45.00 tonnes CO₂e (30%)
Scope 2 (Electricity):      75.00 tonnes CO₂e (50%)
Scope 3 (Indirect):         30.00 tonnes CO₂e (20%)

───────────────────────────────────────────────────────
EMISSION INTENSITY
───────────────────────────────────────────────────────

Per ₹ Crore Revenue:    15.00 tonnes CO₂e
Per Employee:            1.50 tonnes CO₂e
Per Unit Produced:       0.15 tonnes CO₂e

═══════════════════════════════════════════════════════
```

---

## Emission Factors Database

### India-Specific Factors (as per SEBI BRSR Guidelines)

#### Fuels (Scope 1)
| Fuel Type | Emission Factor | Unit |
|-----------|----------------|------|
| Diesel | 2.68 | kg CO₂e/liter |
| Petrol | 2.31 | kg CO₂e/liter |
| Natural Gas | 2.03 | kg CO₂e/m³ |
| LPG | 3.00 | kg CO₂e/kg |
| Coal | 2,419 | kg CO₂e/tonne |

#### Electricity (Scope 2 - by State)
| State/Region | Grid Emission Factor | Unit |
|--------------|---------------------|------|
| Delhi | 0.82 | kg CO₂e/kWh |
| Maharashtra | 0.79 | kg CO₂e/kWh |
| Gujarat | 0.84 | kg CO₂e/kWh |
| Tamil Nadu | 0.71 | kg CO₂e/kWh |
| Karnataka | 0.73 | kg CO₂e/kWh |

#### Transport (Scope 3)
| Mode | Emission Factor | Unit |
|------|----------------|------|
| Air (Domestic, Economy) | 0.133 | kg CO₂e/km |
| Air (International, Economy) | 0.111 | kg CO₂e/km |
| Rail | 0.041 | kg CO₂e/km |
| Car (Petrol) | 0.171 | kg CO₂e/km |
| Bus | 0.089 | kg CO₂e/km |

---

## Quality Assurance

### Validation Checks

1. **Data Completeness**: All mandatory fields filled
2. **Range Validation**: Values within expected ranges
3. **Consistency Checks**: Cross-verification of related data
4. **Benchmark Comparison**: Against industry averages
5. **Audit Trail**: Complete log of all inputs and calculations

### Accuracy Standards

- **Calculation Precision**: Up to 2 decimal places
- **Rounding**: Standard rounding rules applied
- **Factor Updates**: Emission factors updated annually
- **Compliance**: 100% adherence to SEBI BRSR norms

---

## Benefits

### For Companies
✅ **Time Saving**: Minutes vs. weeks for manual calculation  
✅ **Cost Reduction**: 90% cost savings vs. hiring consultants  
✅ **Accuracy**: Eliminates human calculation errors  
✅ **Compliance**: Audit-ready SEBI BRSR reports  
✅ **Scalability**: Works for MSMEs to large corporations  

### For Stakeholders
✅ **Transparency**: Clear, standardized reporting  
✅ **Comparability**: Consistent methodology across companies  
✅ **Reliability**: Verified emission factors  
✅ **Accessibility**: Easy-to-understand outputs  

---

## Support & Resources

### Documentation
- User Guide (detailed step-by-step instructions)
- API Documentation (for integrations)
- FAQ (common questions and issues)

### Contact
- Email: support@brsrcalculator.com
- GitHub: github.com/yourproject/brsr-calculator

---










[METHODOLOGY.md.pdf](https://github.com/user-attachments/files/23693239/METHODOLOGY.md.pdf)






























[BRSR-Business-Overview.pptx](https://github.com/user-attachments/files/23693222/BRSR-Business-Overview.pptx)











































<img width="992" height="555" alt="image" src="https://github.com/user-attachments/assets/7e299203-b5d1-45f1-bb74-28d885381850" />








































We will help companies
calculate absolute carbon
emission and the intensity ratio
as per SEBI BRSR NormS.

