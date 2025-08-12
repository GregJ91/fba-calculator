// FBA Size Tier Configuration based on official pricing table
const FBA_SIZE_TIERS = {
    SMALL_ENVELOPE: {
        name: 'Small envelope',
        maxDimensions: [20, 15, 1],
        weightBrackets: [0.08, 0.21], // ≤ 80g, ≤ 210g
        maxUnitWeight: 0.21,
        maxDimensionalWeight: null
    },
    STANDARD_ENVELOPE: {
        name: 'Standard envelope', 
        maxDimensions: [35, 25, 2.5],
        weightBrackets: [0.06, 0.21, 0.46], // ≤ 60g, ≤ 210g, ≤ 460g
        maxUnitWeight: 0.46,
        maxDimensionalWeight: null
    },
    LARGE_ENVELOPE: {
        name: 'Large envelope',
        maxDimensions: [35, 25, 4],
        weightBrackets: [0.96], // ≤ 960g
        maxUnitWeight: 0.96,
        maxDimensionalWeight: null
    },
    EXTRA_LARGE_ENVELOPE: {
        name: 'Extra-large envelope',
        maxDimensions: [35, 25, 6],
        weightBrackets: [0.96], // ≤ 960g only
        maxUnitWeight: 0.96,
        maxDimensionalWeight: null
    },
    SMALL_PARCEL: {
        name: 'Small parcel',
        maxDimensions: [35, 25, 12],
        weightBrackets: [0.15, 0.4, 0.9, 1.4, 1.9, 3.9], // ≤ 150g to ≤ 3.9kg
        maxUnitWeight: 3.9,
        maxDimensionalWeight: 3.9
    },
    STANDARD_PARCEL: {
        name: 'Standard parcel',
        maxDimensions: [45, 34, 26],
        weightBrackets: [0.15, 0.4, 0.9, 1.4, 1.9, 2.9, 3.5, 5.9, 8.9, 11.9], // ≤ 150g to ≤ 11.9kg
        maxUnitWeight: 11.9,
        maxDimensionalWeight: 11.9
    },
    SMALL_OVERSIZE: {
        name: 'Small oversize',
        maxDimensions: [61, 46, 46],
        weightBrackets: [0.76, 1.26, 1.76], // ≤ 760g to ≤ 1.76kg (no surcharge)
        maxUnitWeight: 4.76, // Unit weight ≤ 4.76kg, surcharge >1.76kg
        maxDimensionalWeight: 25.82, // Dimensional weight ≤ 25.82kg
        overweightSurcharge: 0.01, // £0.01 per kg over 1.76kg
        surchargeThreshold: 1.76 // Surcharge applies above 1.76kg
    },
    STANDARD_OVERSIZE: {
        name: 'Standard oversize', 
        maxDimensions: [120, 60, 60],
        weightBrackets: [0.76, 1.76, 2.76, 3.76, 4.76, 9.76, 14.76, 19.76, 24.76, 29.76], // ≤ 760g to ≤ 29.76kg (base pricing)
        maxUnitWeight: 32.9, // Can accept up to ~33kg with surcharge above 29.76kg
        maxDimensionalWeight: 68.4,
        overweightSurcharge: 0.01 // £0.01 per kg over 29.76kg
    },
    LARGE_OVERSIZE: {
        name: 'Large oversize',
        maxDimensions: null, // > 120x60x60
        weightBrackets: [4.76, 9.76, 14.76, 19.76, 24.76, 31.5], // ≤ 4.76kg to ≤ 31.5kg
        maxUnitWeight: 31.5,
        maxDimensionalWeight: 108, // < 108kg (exclusive)
        requiresLargeDimensions: true,
        overweightSurcharge: 0.01 // £0.01 per kg over 31.5kg
    },
    SPECIAL_OVERSIZE: {
        name: 'Special oversize',
        maxDimensions: null, // Longest side > 175 or girth > 360
        weightBrackets: [20, 30, 40, 50, 60, 999], // ≤ 20kg to ≥ 60kg with per-kg charges above 60kg
        maxUnitWeight: null,
        maxDimensionalWeight: null,
        requiresSpecialCheck: true
    }
};

// Complete FBA fee data structure based on official pricing table
const FBA_FEES = {
    'UK': {
        'Small envelope': { 0.08: 1.71, 0.21: 1.89 },
        'Standard envelope': { 0.06: 1.89, 0.21: 2.07, 0.46: 2.20 },
        'Large envelope': { 0.96: 2.73 },
        'Extra-large envelope': { 0.96: 2.95 },
        'Small parcel': { 0.15: 2.99, 0.4: 3.01, 0.9: 3.05, 1.4: 3.23, 1.9: 3.58, 3.9: 5.62 },
        'Standard parcel': { 0.15: 3.00, 0.4: 3.16, 0.9: 3.37, 1.4: 3.60, 1.9: 3.90, 2.9: 5.65, 3.5: 5.96, 5.9: 6.13, 8.9: 6.99, 11.9: 7.39 },
        'Small oversize': { 0.76: 5.32, 1.26: 6.17, 1.76: 6.36 },
        'Standard oversize': { 0.76: 6.32, 1.76: 6.67, 2.76: 6.82, 3.76: 6.86, 4.76: 6.89, 9.76: 8.24, 14.76: 8.82, 19.76: 9.24, 24.76: 10.24, 29.76: 10.25 },
        'Large oversize': { 4.76: 11.45, 9.76: 12.52, 14.76: 13.22, 19.76: 13.86, 24.76: 15.08, 31.5: 15.12 },
        'Special oversize': { 20: 15.43, 30: 18.48, 40: 19.16, 50: 42.98, 60: 44.25, 999: 44.25 }
    },
    'DE': {
        'Small envelope': { 0.08: 1.90, 0.21: 2.09 },
        'Standard envelope': { 0.21: 2.25, 0.46: 2.39 },
        'Large envelope': { 0.96: 2.74 },
        'Extra-large envelope': { 0.96: 3.12, 1.5: 3.12 },
        'Small parcel': { 0.15: 3.22, 0.4: 3.63, 0.9: 4.11, 1.4: 4.84, 1.9: 5.32, 3.9: 5.98 },
        'Standard parcel': { 1.4: 4.84, 1.9: 5.32, 2.9: 5.98, 3.5: 6.55, 5.9: 6.89, 8.9: 7.44, 11.9: 7.75 },
        'Small oversize': { 0.76: 6.59, 1.26: 6.41, 1.76: 6.43, 2.76: 7.59, 3.76: 7.65, 4.76: 7.68 },
        'Standard oversize': { 4.76: 7.68, 9.76: 8.07, 14.76: 8.79, 19.76: 9.34, 24.76: 10.58, 29.76: 10.59 },
        'Large oversize': { 4.76: 9.26, 9.76: 10.66, 14.76: 11.00, 19.76: 11.63, 24.76: 12.86, 31.5: 12.90 },
        'Special oversize': { 20: 19.98, 30: 27.16, 40: 28.46, 50: 59.97, 60: 61.17, 999: 61.17 }
    },
    'FR': {
        'Small envelope': { 0.08: 2.70 },
        'Standard envelope': { 0.06: 2.80, 0.21: 3.34, 0.46: 3.62 },
        'Large envelope': { 0.96: 4.45 },
        'Extra-large envelope': { 0.96: 4.79, 1.5: 4.79 },
        'Small parcel': { 0.15: 5.18, 0.4: 5.32, 0.9: 6.16, 1.4: 6.24, 1.9: 9.55, 3.9: 9.24 },
        'Standard parcel': { 1.4: 4.84, 1.9: 5.50, 2.9: 6.40, 3.9: 6.77, 5.9: 6.97, 8.9: 9.55, 11.9: 10.22, 999: 11.65 },
        'Small oversize': { 0.76: 9.36, 1.26: 9.75, 1.76: 10.39, 999: null },
        'Standard oversize': { 0.76: 9.75, 1.76: 10.57, 2.76: 11.10, 3.76: 11.56, 4.76: 11.64, 9.76: 12.54, 14.76: 13.46, 19.76: 14.14, 24.76: 14.14, 29.76: 15.75, 999: 15.75 },
        'Large oversize': { 4.76: 16.91, 9.76: 20.60, 14.76: 21.69, 19.76: 22.76, 24.76: 24.88, 31.5: 25.45, 999: null },
        'Special oversize': { 20: 23.95, 30: 30.88, 40: 31.76, 50: 54.04, 60: 55.63, 999: 55.63 }
    },
    'IT': {
        'Small envelope': { 0.08: 3.11 },
        'Standard envelope': { 0.06: 3.24, 0.21: 3.37, 0.46: 3.60 },
        'Large envelope': { 0.96: 3.90 },
        'Extra-large envelope': { 0.96: 4.13, 1.5: 4.13 },
        'Small parcel': { 0.15: 4.44, 0.4: 4.97, 0.9: 5.59, 1.4: 5.84, 1.9: 7.70, 3.9: 9.02 },
        'Standard parcel': { 1.4: 4.50, 1.9: 5.08, 2.9: 5.78, 3.9: 6.52, 5.9: 7.72, 8.9: 8.01, 11.9: 10.87, 999: 10.87 },
        'Small oversize': { 0.76: 9.24, 1.26: 9.72, 1.76: 9.96, 999: null },
        'Standard oversize': { 0.76: 9.72, 1.76: 9.94, 2.76: 10.64, 3.76: 10.68, 4.76: 9.31, 9.76: 12.11, 14.76: 10.84, 19.76: 12.33, 24.76: 13.57, 29.76: 14.01, 999: 14.01 },
        'Large oversize': { 4.76: 10.84, 9.76: 12.33, 14.76: 13.57, 19.76: 14.01, 24.76: 15.71, 31.5: 15.80, 999: null },
        'Special oversize': { 20: 17.41, 30: 20.16, 40: 20.91, 50: 27.93, 60: 28.48, 999: 28.48 }
    },
    'ES': {
        'Small envelope': { 0.08: 2.53 },
        'Standard envelope': { 0.06: 2.84, 0.21: 3.18, 0.46: 3.42 },
        'Large envelope': { 0.96: 3.57 },
        'Extra-large envelope': { 0.96: 3.80, 1.5: 3.80 },
        'Small parcel': { 0.15: 4.03, 0.4: 4.26, 0.9: 4.75, 1.4: 4.82, 1.9: 6.27, 3.9: 4.75 },
        'Standard parcel': { 1.4: 3.62, 1.9: 4.39, 2.9: 4.73, 3.9: 5.44, 5.9: 5.54, 8.9: 6.29, 11.9: 7.70, 999: 7.95 },
        'Small oversize': { 0.76: 7.32, 1.26: 8.03, 1.76: 8.13, 999: null },
        'Standard oversize': { 0.76: 8.03, 1.76: 8.16, 2.76: 8.95, 3.76: 9.02, 4.76: 8.31, 9.76: 13.62, 14.76: 11.19, 19.76: 15.01, 24.76: 16.21, 29.76: 17.36, 999: 17.36 },
        'Large oversize': { 4.76: 11.19, 9.76: 15.01, 14.76: 16.21, 19.76: 17.36, 24.76: 18.82, 31.5: 21.57, 999: null },
        'Special oversize': { 20: 17.75, 30: 24.33, 40: 25.23, 50: 39.32, 60: 40.08, 999: 40.08 }
    },
    'NL': {
        'Small envelope': { 0.08: 1.91 },
        'Standard envelope': { 0.06: 2.08, 0.21: 2.28, 0.46: 2.42 },
        'Large envelope': { 0.96: 2.88 },
        'Extra-large envelope': { 0.96: 3.21, 1.5: 3.22 },
        'Small parcel': { 0.15: 3.26, 0.4: 3.83, 0.9: 4.50, 1.4: 4.82, 1.9: 6.25, 3.9: 4.50 },
        'Standard parcel': { 1.4: 3.28, 1.9: 3.60, 2.9: 4.13, 3.9: 4.93, 5.9: 5.40, 8.9: 6.26, 11.9: 7.34, 999: 7.34 },
        'Small oversize': { 0.76: 7.22, 1.26: 7.25, 1.76: 7.23, 999: null },
        'Standard oversize': { 0.76: 7.25, 1.76: 7.53, 2.76: 8.36, 3.76: 8.45, 4.76: 8.49, 9.76: 8.75, 14.76: 9.96, 19.76: 11.38, 24.76: 11.82, 29.76: 12.49, 999: 12.49 },
        'Large oversize': { 4.76: 9.96, 9.76: 11.38, 14.76: 11.82, 19.76: 12.49, 24.76: 13.83, 31.5: 13.86, 999: null },
        'Special oversize': { 20: null, 30: null, 40: null, 50: null, 60: null, 999: null }
    },
    'SE': {
        'Small envelope': { 0.08: 30.04 },
        'Standard envelope': { 0.06: 30.88, 0.21: 32.20, 0.46: 37.09 },
        'Large envelope': { 0.96: 38.55 },
        'Extra-large envelope': { 0.96: 42.24, 1.5: 43.67 },
        'Small parcel': { 0.15: 45.75, 0.4: 46.38, 0.9: 47.77, 1.4: 49.37, 1.9: 58.79, 3.9: 47.09 },
        'Standard parcel': { 1.4: 47.09, 1.9: 49.35, 2.9: 50.07, 3.9: 52.34, 5.9: 56.94, 8.9: 65.18, 11.9: 85.31, 999: 85.31 },
        'Small oversize': { 0.76: 82.32, 1.26: 84.40, 1.76: 85.26, 2.76: 101.26, 3.76: 102.09, 4.76: 102.09 },
        'Standard oversize': { 0.76: 84.40, 1.76: 86.73, 2.76: 101.26, 3.76: 102.09, 4.76: 102.09, 9.76: 106.71, 14.76: 118.02, 19.76: 136.14, 24.76: 145.63, 29.76: 153.50, 999: 153.50 },
        'Large oversize': { 4.76: 118.02, 9.76: 136.14, 14.76: 145.63, 19.76: 153.50, 24.76: 170.43, 31.5: 170.79, 999: null },
        'Special oversize': { 20: null, 30: null, 40: null, 50: null, 60: null, 999: null }
    },
    'PL': {
        'Small envelope': { 0.08: 4.75 },
        'Standard envelope': { 0.06: 4.80, 0.21: 4.94, 0.46: 5.20 },
        'Large envelope': { 0.96: 5.64 },
        'Extra-large envelope': { 0.96: 5.70, 1.5: 5.70 },
        'Small parcel': { 0.15: 5.77, 0.4: 6.55, 0.9: 6.81, 1.4: 6.82, 1.9: 6.86, 3.9: 6.55 },
        'Standard parcel': { 1.4: 5.79, 1.9: 5.83, 2.9: 6.61, 3.9: 6.86, 5.9: 6.89, 8.9: 6.95, 11.9: 7.00, 999: 7.46 },
        'Small oversize': { 0.76: 8.05, 1.26: 8.29, 1.76: 8.40, 999: null },
        'Standard oversize': { 0.76: 8.29, 1.76: 8.40, 2.76: 9.81, 3.76: 9.89, 4.76: 9.89, 9.76: 10.48, 14.76: 10.74, 19.76: 12.59, 24.76: 13.25, 29.76: 14.00, 999: 14.00 },
        'Large oversize': { 4.76: 10.74, 9.76: 12.59, 14.76: 13.25, 19.76: 14.00, 24.76: 15.51, 31.5: 15.54, 999: null },
        'Special oversize': { 20: null, 30: null, 40: null, 50: null, 60: null, 999: null }
    },
    'BE': {
        'Small envelope': { 0.08: 1.90 },
        'Standard envelope': { 0.06: 2.07, 0.21: 2.27, 0.46: 2.41 },
        'Large envelope': { 0.96: 2.91 },
        'Extra-large envelope': { 0.96: 3.19, 1.5: 2.98 },
        'Small parcel': { 0.15: 3.50, 0.4: 3.84, 0.9: 4.51, 1.4: 4.83, 1.9: 6.25, 3.9: 3.84 },
        'Standard parcel': { 1.4: 3.21, 1.9: 3.60, 2.9: 4.14, 3.9: 4.94, 5.9: 5.41, 8.9: 6.27, 11.9: 6.30, 999: 6.54 },
        'Small oversize': { 0.76: 6.63, 1.26: 6.78, 1.76: 6.80, 999: null },
        'Standard oversize': { 0.76: 6.78, 1.76: 6.98, 2.76: 8.03, 3.76: 8.10, 4.76: 8.12, 9.76: 8.54, 14.76: 9.50, 19.76: 10.86, 24.76: 11.64, 29.76: 12.30, 999: 12.30 },
        'Large oversize': { 4.76: 9.50, 9.76: 10.86, 14.76: 11.64, 19.76: 12.30, 24.76: 13.61, 31.5: 13.64, 999: null },
        'Special oversize': { 20: null, 30: null, 40: null, 50: null, 60: null, 999: null }
    }
};

// Additional per-kg charges for overweight items (based on official pricing table)
const ADDITIONAL_CHARGES = {
    'Special oversize': { UK: 0.39, DE: 0.35, FR: 0.42, IT: 0.60, ES: 0.51, NL: null, SE: null, PL: null, BE: null }
};

class FBACalculator {
    constructor() {
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const form = document.getElementById('fbaCalculator');
        const testButton = document.getElementById('runTests');
        const weightKg = document.getElementById('weightKg');
        const weightGrams = document.getElementById('weightGrams');

        // Only add event listeners if elements exist (for main calculator page)
        if (form) {
            form.addEventListener('submit', (e) => this.handleCalculation(e));
        }
        
        if (testButton) {
            testButton.addEventListener('click', () => this.runTests());
        }

        // Auto-convert weight inputs
        if (weightKg) {
            weightKg.addEventListener('input', this.handleWeightInput);
        }
        
        if (weightGrams) {
            weightGrams.addEventListener('input', this.handleWeightInput);
        }
    }

    handleWeightInput(e) {
        // Optional: Auto-convert between kg and grams
        // This could be implemented if needed
    }

    handleCalculation(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const dimensions = {
            height: parseFloat(formData.get('height')),
            width: parseFloat(formData.get('width')),
            depth: parseFloat(formData.get('depth'))
        };

        const weightKg = parseFloat(formData.get('weightKg')) || 0;
        const weightGrams = parseFloat(formData.get('weightGrams')) || 0;
        const totalWeight = weightKg + (weightGrams / 1000); // Convert to kg

        const zone = formData.get('zone');

        // Calculate dimensional weight
        const { height, width, depth } = dimensions;
        const sortedDims = [height, width, depth].sort((a, b) => b - a);
        const dimensionalWeight = this.calculateDimensionalWeight(sortedDims[0], sortedDims[1], sortedDims[2]);

        // Determine size tier
        const sizeTier = this.determineSizeTier(dimensions, totalWeight, dimensionalWeight);
        
        // Find appropriate weight bracket within the tier
        const weightBracket = this.findWeightBracket(sizeTier, totalWeight);
        
        // Calculate fee (placeholder for now)
        const fee = this.calculateFee(sizeTier, totalWeight, zone, weightBracket);

        // Display results
        this.displayResults(dimensions, totalWeight, sizeTier, fee, dimensionalWeight, weightBracket);
    }

    determineSizeTier(dimensions, unitWeight, dimensionalWeight = null) {
        const { height, width, depth } = dimensions;
        
        // Sort dimensions to get length (longest), width (middle), height (shortest)
        const sortedDims = [height, width, depth].sort((a, b) => b - a);
        const [length, widthSorted, heightSorted] = sortedDims;

        // Calculate dimensional weight if not provided
        if (dimensionalWeight === null) {
            dimensionalWeight = this.calculateDimensionalWeight(length, widthSorted, heightSorted);
        }

        // Calculate girth for special oversize check
        const girth = this.calculateGirth(length, widthSorted, heightSorted);

        // Check each tier in order from smallest to largest
        
        // Small envelope: ≤ 20 x 15 x 1 AND ≤ 210g
        if (this.fitsInDimensions(sortedDims, [20, 15, 1]) && 
            unitWeight <= FBA_SIZE_TIERS.SMALL_ENVELOPE.maxUnitWeight) {
            return FBA_SIZE_TIERS.SMALL_ENVELOPE;
        }

        // Standard envelope: ≤ 35 x 25 x 2.5 AND ≤ 460g
        if (this.fitsInDimensions(sortedDims, [35, 25, 2.5]) && 
            unitWeight <= FBA_SIZE_TIERS.STANDARD_ENVELOPE.maxUnitWeight) {
            return FBA_SIZE_TIERS.STANDARD_ENVELOPE;
        }

        // Large envelope: ≤ 35 x 25 x 4 AND ≤ 960g
        if (this.fitsInDimensions(sortedDims, [35, 25, 4]) && 
            unitWeight <= FBA_SIZE_TIERS.LARGE_ENVELOPE.maxUnitWeight) {
            return FBA_SIZE_TIERS.LARGE_ENVELOPE;
        }

        // Extra-large envelope: ≤ 35 x 25 x 6 AND ≤ 960g
        if (this.fitsInDimensions(sortedDims, [35, 25, 6]) && 
            unitWeight <= FBA_SIZE_TIERS.EXTRA_LARGE_ENVELOPE.maxUnitWeight) {
            return FBA_SIZE_TIERS.EXTRA_LARGE_ENVELOPE;
        }

        // Small parcel: ≤ 35 x 25 x 12 AND (unit weight OR dimensional weight ≤ 3.9kg)
        if (this.fitsInDimensions(sortedDims, [35, 25, 12]) && 
            Math.max(unitWeight, dimensionalWeight) <= FBA_SIZE_TIERS.SMALL_PARCEL.maxUnitWeight) {
            return FBA_SIZE_TIERS.SMALL_PARCEL;
        }

        // Standard parcel: ≤ 45 x 34 x 26 AND (unit weight OR dimensional weight ≤ 11.9kg)
        if (this.fitsInDimensions(sortedDims, [45, 34, 26]) && 
            Math.max(unitWeight, dimensionalWeight) <= FBA_SIZE_TIERS.STANDARD_PARCEL.maxUnitWeight) {
            return FBA_SIZE_TIERS.STANDARD_PARCEL;
        }

        // Small oversize: ≤ 61 x 46 x 46 AND unit weight ≤ 4.76kg AND dimensional weight ≤ 25.82kg
        // Items >1.76kg get surcharge, but max unit weight is 4.76kg
        if (this.fitsInDimensions(sortedDims, [61, 46, 46]) && 
            unitWeight <= 4.76 &&
            dimensionalWeight <= FBA_SIZE_TIERS.SMALL_OVERSIZE.maxDimensionalWeight) {
            return FBA_SIZE_TIERS.SMALL_OVERSIZE;
        }

        // Standard oversize: ≤ 120 x 60 x 60 AND unit weight < 33kg AND dimensional weight < 68.4kg (surcharge >29.76kg)
        if (this.fitsInDimensions(sortedDims, [120, 60, 60]) && 
            unitWeight < FBA_SIZE_TIERS.STANDARD_OVERSIZE.maxUnitWeight &&
            dimensionalWeight < FBA_SIZE_TIERS.STANDARD_OVERSIZE.maxDimensionalWeight) {
            return FBA_SIZE_TIERS.STANDARD_OVERSIZE;
        }

        // Large oversize: Either (> 120 x 60 x 60) OR (≤ 120 x 60 x 60 but dimensional weight ≥ 68.4kg)
        // AND unit weight < 31.5kg AND dimensional weight ≤ 108kg AND not Special oversize
        const exceedsStandardDimensions = !this.fitsInDimensions(sortedDims, [120, 60, 60]);
        const exceedsStandardDimensionalWeight = dimensionalWeight >= 68.4;
        
        if ((exceedsStandardDimensions || exceedsStandardDimensionalWeight) && 
            unitWeight < FBA_SIZE_TIERS.LARGE_OVERSIZE.maxUnitWeight &&
            dimensionalWeight < FBA_SIZE_TIERS.LARGE_OVERSIZE.maxDimensionalWeight &&
            length <= 175 && girth <= 360) {
            return FBA_SIZE_TIERS.LARGE_OVERSIZE;
        }

        // Special oversize: Longest side > 175 or girth > 360 (only if doesn't fit other categories)
        if (length > 175 || girth > 360) {
            return FBA_SIZE_TIERS.SPECIAL_OVERSIZE;
        }

        // Final fallback to Special oversize
        return FBA_SIZE_TIERS.SPECIAL_OVERSIZE;
    }

    calculateDimensionalWeight(length, width, height) {
        // Amazon's dimensional weight formula: (L × W × H) / 5000 for cm to kg
        return (length * width * height) / 5000;
    }

    calculateGirth(length, width, height) {
        // Girth = 2 × (width + height) + length
        return 2 * (width + height) + length;
    }

    findWeightBracket(sizeTier, weight) {
        const brackets = sizeTier.weightBrackets;
        for (let i = 0; i < brackets.length; i++) {
            if (weight <= brackets[i]) {
                return {
                    index: i,
                    limit: brackets[i],
                    description: this.getWeightBracketDescription(brackets[i])
                };
            }
        }
        // If weight exceeds all brackets, return the last one
        return {
            index: brackets.length - 1,
            limit: brackets[brackets.length - 1],
            description: this.getWeightBracketDescription(brackets[brackets.length - 1])
        };
    }

    getWeightBracketDescription(limit) {
        if (limit >= 999) {
            return 'Over maximum bracket';
        } else if (limit >= 1) {
            return `≤ ${limit}kg`;
        } else {
            return `≤ ${Math.round(limit * 1000)}g`;
        }
    }

    fitsInDimensions(itemDims, maxDims) {
        // itemDims and maxDims should both be sorted arrays [length, width, height]
        return itemDims[0] <= maxDims[0] && 
               itemDims[1] <= maxDims[1] && 
               itemDims[2] <= maxDims[2];
    }

    calculateFee(sizeTier, weight, zone, weightBracket) {
        const zoneData = FBA_FEES[zone];
        if (!zoneData || !zoneData[sizeTier.name]) {
            return 'Service not available in this zone';
        }

        const tierFees = zoneData[sizeTier.name];
        
        // Find the appropriate fee for the weight bracket
        let baseFee = null;
        const sortedWeightLimits = Object.keys(tierFees)
            .map(w => parseFloat(w))
            .sort((a, b) => a - b); // Sort in ascending order
        
        for (const limit of sortedWeightLimits) {
            if (weight <= limit) {
                baseFee = tierFees[limit];
                break;
            }
        }

        // If weight exceeds all brackets, use the highest bracket (excluding 999 key)
        if (baseFee === null) {
            const weights = Object.keys(tierFees)
                .map(w => parseFloat(w))
                .filter(w => w < 999)
                .sort((a, b) => b - a);
            if (weights.length > 0) {
                baseFee = tierFees[weights[0]];
            }
        }

        // Handle null fees (service not available)
        if (baseFee === null) {
            return 'Service not available in this zone';
        }

        let totalFee = baseFee;

        // Add surcharges for overweight items in specific categories
        if (sizeTier.overweightSurcharge) {
            let overweightAmount = 0;
            
            if (sizeTier.name === 'Small oversize' && weight > sizeTier.surchargeThreshold) {
                overweightAmount = weight - sizeTier.surchargeThreshold;
            } else if (sizeTier.name === 'Standard oversize' && weight > 29.76) {
                overweightAmount = weight - 29.76;
            } else if (sizeTier.name === 'Large oversize' && weight > 31.5) {
                overweightAmount = weight - 31.5;
            }
            
            if (overweightAmount > 0) {
                totalFee += overweightAmount * sizeTier.overweightSurcharge;
            }
        }

        // Add additional per-kg charges for Special oversize items above 60kg
        if (sizeTier.name === 'Special oversize' && weight > 60) {
            const additionalCharges = ADDITIONAL_CHARGES[sizeTier.name];
            if (additionalCharges && additionalCharges[zone] !== null) {
                const excessWeight = weight - 60;
                const perKgCharge = additionalCharges[zone];
                totalFee += excessWeight * perKgCharge;
            }
        }

        // Format with appropriate currency symbol
        const currencySymbols = {
            'UK': '£',
            'DE': '€',
            'FR': '€', 
            'IT': '€',
            'ES': '€',
            'NL': '€',
            'SE': ' SEK',
            'PL': ' PLN',
            'BE': '€'
        };

        const symbol = currencySymbols[zone] || '';
        
        if (zone === 'SE' || zone === 'PL') {
            return `${totalFee.toFixed(2)}${symbol}`;
        } else {
            return `${symbol}${totalFee.toFixed(2)}`;
        }
    }



    displayResults(dimensions, unitWeight, sizeTier, fee, dimensionalWeight, weightBracket) {
        document.getElementById('sizeTier').textContent = sizeTier.name;
        document.getElementById('totalWeight').textContent = `Unit: ${unitWeight.toFixed(3)}kg | Dimensional: ${dimensionalWeight.toFixed(3)}kg`;
        document.getElementById('dimensions').textContent = `${dimensions.height} x ${dimensions.width} x ${dimensions.depth} cm`;
        document.getElementById('fbaFee').textContent = fee;
        
        // Add weight bracket info if it doesn't exist (scoped to results section)
        const resultsSection = document.getElementById('results');
        let weightBracketElement = resultsSection ? resultsSection.querySelector('#weightBracket') : null;
        if (!weightBracketElement && resultsSection) {
            const newResultItem = document.createElement('div');
            newResultItem.className = 'result-item';
            newResultItem.innerHTML = '<strong>Weight Bracket:</strong> <span id="weightBracket"></span>';
            const lastResultItem = resultsSection.querySelector('.result-item:last-child');
            if (lastResultItem) {
                resultsSection.insertBefore(newResultItem, lastResultItem.nextSibling);
            } else {
                resultsSection.appendChild(newResultItem);
            }
            weightBracketElement = resultsSection.querySelector('#weightBracket');
        }
        
        if (weightBracketElement) {
            weightBracketElement.textContent = weightBracket.description;
        }
        
        document.getElementById('results').style.display = 'block';
    }

    runTests() {
        const testCases = [
            {
                name: 'Small envelope test (within limits)',
                dimensions: { height: 15, width: 10, depth: 0.8 },
                weight: 0.05, // 50g - within 80g limit
                expectedTier: 'Small envelope'
            },
            {
                name: 'Small envelope test (within 210g limit)',
                dimensions: { height: 15, width: 10, depth: 0.8 },
                weight: 0.1, // 100g - within 210g limit
                expectedTier: 'Small envelope'
            },
            {
                name: 'Standard envelope test (within limits)',
                dimensions: { height: 30, width: 20, depth: 2 },
                weight: 0.2, // 200g - within 460g limit
                expectedTier: 'Standard envelope'
            },
            {
                name: 'Large envelope test (within limits)',
                dimensions: { height: 32, width: 22, depth: 3.5 },
                weight: 0.5, // 500g - within 960g limit
                expectedTier: 'Large envelope'
            },
            {
                name: 'Extra-large envelope test',
                dimensions: { height: 32, width: 22, depth: 5 },
                weight: 0.8, // 800g - within 960g limit
                expectedTier: 'Extra-large envelope'
            },
            {
                name: 'Small parcel test (within all limits)',
                dimensions: { height: 30, width: 20, depth: 10 },
                weight: 2.0, // 2kg - within 3.9kg limit
                expectedTier: 'Small parcel'
            },
            {
                name: 'Small parcel test (exceeds weight)',
                dimensions: { height: 30, width: 20, depth: 10 },
                weight: 5.0, // 5kg - exceeds 3.9kg limit
                expectedTier: 'Standard parcel'
            },
            {
                name: 'Standard parcel test (larger dimensions)',
                dimensions: { height: 40, width: 30, depth: 20 },
                weight: 8.0, // 8kg - within 11.9kg limit
                expectedTier: 'Standard parcel'
            },
            {
                name: 'Small oversize test',
                dimensions: { height: 50, width: 40, depth: 30 },
                weight: 1.5, // 1.5kg - within 4.76kg limit, dim weight ~12kg
                expectedTier: 'Small oversize'
            },
            {
                name: 'Standard oversize test',
                dimensions: { height: 100, width: 50, depth: 50 },
                weight: 15.0, // 15kg - within 29.76kg limit
                expectedTier: 'Standard oversize'
            },
            {
                name: 'Large oversize test',
                dimensions: { height: 130, width: 70, depth: 70 },
                weight: 25.0, // 25kg - within 31.5kg limit
                expectedTier: 'Large oversize'
            },
            {
                name: 'Special oversize test (large dimensions)',
                dimensions: { height: 180, width: 80, depth: 80 },
                weight: 30.0,
                expectedTier: 'Special oversize'
            }
        ];

        let results = 'Running FBA Size Tier Tests...\n\n';
        let passed = 0;
        let total = testCases.length;

        testCases.forEach((test, index) => {
            const { height, width, depth } = test.dimensions;
            const sortedDims = [height, width, depth].sort((a, b) => b - a);
            const dimensionalWeight = this.calculateDimensionalWeight(sortedDims[0], sortedDims[1], sortedDims[2]);
            
            const tier = this.determineSizeTier(test.dimensions, test.weight, dimensionalWeight);
            const success = tier.name === test.expectedTier;
            
            results += `Test ${index + 1}: ${test.name}\n`;
            results += `  Dimensions: ${test.dimensions.height} x ${test.dimensions.width} x ${test.dimensions.depth} cm\n`;
            results += `  Unit Weight: ${test.weight} kg\n`;
            results += `  Dimensional Weight: ${dimensionalWeight.toFixed(3)} kg\n`;
            results += `  Expected: ${test.expectedTier}\n`;
            results += `  Got: ${tier.name}\n`;
            results += `  Result: ${success ? '✅ PASS' : '❌ FAIL'}\n\n`;
            
            if (success) passed++;
        });

        results += `Tests completed: ${passed}/${total} passed\n`;
        
        document.getElementById('testResults').textContent = results;
    }
}

// Initialize the calculator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new FBACalculator();
}); 