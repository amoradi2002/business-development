export const mockLeads = [
  {
    id: '1', name: 'Marcus Johnson', phone: '(818) 555-0142', email: 'marcus.j@gmail.com',
    loanType: 'Hard Money Bridge', propertyType: 'Single Family', propertyAddress: '4521 Olive Ave, Burbank, CA 91505',
    propertyValue: 850000, loanBalance: 0, desiredAmount: 595000, loanTerm: '12 months',
    interestRate: 10.5, monthlyPayment: 5206, ltv: 70, status: 'New',
    submittedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), notes: '',
    firstName: 'Marcus', lastName: 'Johnson', city: 'Burbank', zip: '91505', state: 'California',
    coBorrower: 'No', loanPurpose: 'Purchasing a home I\'ve already found', income: 12000
  },
  {
    id: '2', name: 'Sandra Chen', phone: '(310) 555-0198', email: 'sandra.chen@outlook.com',
    loanType: 'Cash-Out Refinance', propertyType: 'Condo', propertyAddress: '1200 Wilshire Blvd #405, Los Angeles, CA 90017',
    propertyValue: 620000, loanBalance: 280000, desiredAmount: 154000, loanTerm: '30yr',
    interestRate: 7.25, monthlyPayment: 1050, ltv: 70, status: 'Contacted',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), notes: 'Wants to pull equity for business expansion',
    firstName: 'Sandra', lastName: 'Chen', city: 'Los Angeles', zip: '90017', state: 'California',
    coBorrower: 'No', loanPurpose: 'Refinance my existing loan balance', income: 8500
  },
  {
    id: '3', name: 'Robert Petrosyan', phone: '(818) 555-0267', email: 'rob.petrosyan@yahoo.com',
    loanType: 'Rehab Loan', propertyType: 'Multifamily', propertyAddress: '7832 Laurel Canyon Blvd, North Hollywood, CA 91605',
    propertyValue: 1200000, loanBalance: 0, desiredAmount: 780000, loanTerm: '12 months',
    interestRate: 11.5, monthlyPayment: 7475, ltv: 65, status: 'New',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(), notes: '',
    firstName: 'Robert', lastName: 'Petrosyan', city: 'North Hollywood', zip: '91605', state: 'California',
    coBorrower: 'Yes', loanPurpose: 'Other', income: 22000
  },
  {
    id: '4', name: 'Lisa Park', phone: '(626) 555-0334', email: 'lisa.park@gmail.com',
    loanType: 'HELOC', propertyType: 'Single Family', propertyAddress: '345 Oak Knoll Dr, Pasadena, CA 91101',
    propertyValue: 1450000, loanBalance: 520000, desiredAmount: 712500, loanTerm: '10yr',
    interestRate: 8.75, monthlyPayment: 5195, ltv: 85, status: 'Soft Pull Done',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), notes: 'Excellent equity position, self-employed',
    firstName: 'Lisa', lastName: 'Park', city: 'Pasadena', zip: '91101', state: 'California',
    coBorrower: 'No', loanPurpose: 'Refinance my existing loan balance', income: 15000
  },
  {
    id: '5', name: 'David Orozco', phone: '(213) 555-0455', email: 'd.orozco@hotmail.com',
    loanType: 'Construction Loan', propertyType: 'Raw Land', propertyAddress: '0 Mulholland Hwy, Calabasas, CA 91302',
    propertyValue: 2800000, loanBalance: 0, desiredAmount: 1960000, loanTerm: '24 months',
    interestRate: 11.99, monthlyPayment: 19567, ltv: 70, status: 'Qualified',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), notes: 'Plans to build custom SFR. Has architect plans ready.',
    firstName: 'David', lastName: 'Orozco', city: 'Calabasas', zip: '91302', state: 'California',
    coBorrower: 'Yes', loanPurpose: 'Construction', income: 45000
  },
  {
    id: '6', name: 'Anahit Grigoryan', phone: '(818) 555-0512', email: 'anahit.g@gmail.com',
    loanType: 'Purchase', propertyType: 'Office', propertyAddress: '2200 W Olive Ave, Burbank, CA 91506',
    propertyValue: 3200000, loanBalance: 0, desiredAmount: 2240000, loanTerm: '5yr',
    interestRate: 7.0, monthlyPayment: 13067, ltv: 70, status: 'New',
    submittedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), notes: '',
    firstName: 'Anahit', lastName: 'Grigoryan', city: 'Burbank', zip: '91506', state: 'California',
    coBorrower: 'No', loanPurpose: 'Purchasing a home I\'ve already found', income: 35000
  },
  {
    id: '7', name: 'James Whitfield', phone: '(805) 555-0623', email: 'j.whitfield@email.com',
    loanType: 'Second Mortgage', propertyType: 'Single Family', propertyAddress: '1890 Las Virgenes Rd, Calabasas, CA 91302',
    propertyValue: 1800000, loanBalance: 900000, desiredAmount: 360000, loanTerm: '15yr',
    interestRate: 9.5, monthlyPayment: 3760, ltv: 70, status: 'In Progress',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), notes: 'Needs funds for new business. Strong equity.',
    firstName: 'James', lastName: 'Whitfield', city: 'Calabasas', zip: '91302', state: 'California',
    coBorrower: 'Yes', loanPurpose: 'Other', income: 28000
  },
  {
    id: '8', name: 'Maria Gonzalez', phone: '(323) 555-0789', email: 'maria.g@gmail.com',
    loanType: 'Hard Money Bridge', propertyType: 'Retail', propertyAddress: '5670 Hollywood Blvd, Los Angeles, CA 90028',
    propertyValue: 4500000, loanBalance: 1200000, desiredAmount: 1950000, loanTerm: '6 months',
    interestRate: 10.5, monthlyPayment: 17063, ltv: 70, status: 'Contacted',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), notes: 'Needs bridge to permanent financing. Retail strip mall.',
    firstName: 'Maria', lastName: 'Gonzalez', city: 'Los Angeles', zip: '90028', state: 'California',
    coBorrower: 'No', loanPurpose: 'Refinance my existing loan balance', income: 52000
  },
  {
    id: '9', name: 'Kevin Nguyen', phone: '(714) 555-0891', email: 'kevin.n@outlook.com',
    loanType: 'Rehab Loan', propertyType: 'Townhouse', propertyAddress: '921 S Brand Blvd, Glendale, CA 91204',
    propertyValue: 750000, loanBalance: 0, desiredAmount: 487500, loanTerm: '12 months',
    interestRate: 11.5, monthlyPayment: 4672, ltv: 65, status: 'New',
    submittedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), notes: '',
    firstName: 'Kevin', lastName: 'Nguyen', city: 'Glendale', zip: '91204', state: 'California',
    coBorrower: 'No', loanPurpose: 'Purchasing a home I\'ve already found', income: 9500
  },
  {
    id: '10', name: 'Thomas Richards', phone: '(818) 555-0934', email: 't.richards@gmail.com',
    loanType: 'Cash-Out Refinance', propertyType: 'Warehouse', propertyAddress: '14200 Arminta St, Van Nuys, CA 91402',
    propertyValue: 5200000, loanBalance: 2100000, desiredAmount: 1540000, loanTerm: '5yr',
    interestRate: 7.25, monthlyPayment: 10501, ltv: 70, status: 'Approved',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(), notes: 'Large warehouse property, strong cash flow. Ready to close.',
    firstName: 'Thomas', lastName: 'Richards', city: 'Van Nuys', zip: '91402', state: 'California',
    coBorrower: 'Yes', loanPurpose: 'Refinance my existing loan balance', income: 67000
  }
];

export const mockBrokerLeads = [
  {
    id: 'b1', brokerName: 'Steve Karayan', companyName: 'Pacific Mortgage Group', phone: '(818) 555-1100',
    email: 'steve@pacificmortgage.com', borrowerScenario: 'Client has 4-unit multifamily in Glendale, needs $1.2M bridge loan to purchase adjacent lot. Current property appraised at $2.1M, no existing liens. Borrower is self-employed, 680 FICO.',
    propertyAddress: '1450 E Colorado St, Glendale, CA 91205', city: 'Glendale', zip: '91205',
    loanAmount: 1200000, propertyValue: 2100000, loanPurpose: 'Bridge to construction',
    status: 'New', submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), notes: ''
  },
  {
    id: 'b2', brokerName: 'Jennifer Wu', companyName: 'Golden State Lending', phone: '(626) 555-2200',
    email: 'jwu@goldenstatelending.com', borrowerScenario: 'Foreign national buyer, purchasing SFR in Arcadia. $1.8M property, putting 40% down, needs $1.08M loan. No US credit history but substantial overseas assets.',
    propertyAddress: '520 W Duarte Rd, Arcadia, CA 91007', city: 'Arcadia', zip: '91007',
    loanAmount: 1080000, propertyValue: 1800000, loanPurpose: 'Purchase',
    status: 'Contacted', submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), notes: 'Verified foreign assets via bank statements'
  },
  {
    id: 'b3', brokerName: 'Michael Torres', companyName: 'Torres Financial', phone: '(213) 555-3300',
    email: 'mtorres@torresfinancial.com', borrowerScenario: 'Investor needs rehab loan for duplex in East LA. Purchase price $650K, rehab budget $150K. ARV estimated $950K. Experienced flipper with 8 completed projects.',
    propertyAddress: '3421 E 1st St, Los Angeles, CA 90063', city: 'Los Angeles', zip: '90063',
    loanAmount: 520000, propertyValue: 650000, loanPurpose: 'Rehab',
    status: 'New', submittedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), notes: ''
  }
];

export const mockRealtorLeads = [
  {
    id: 'r1', realtorName: 'Diana Sargsyan', licenseNumber: '02145678', phone: '(818) 555-4400',
    email: 'diana@bhhscal.com', clientScenario: 'Buyer interested in $1.4M home in Toluca Lake. Pre-approved by bank fell through due to self-employment income docs. Needs private money to close before seller deadline.',
    propertyAddress: '4800 Cahuenga Blvd, Toluca Lake, CA 91602', estimatedValue: 1400000,
    loanAmountNeeded: 980000, status: 'New',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), notes: ''
  },
  {
    id: 'r2', realtorName: 'Brian Kim', licenseNumber: '01987654', phone: '(310) 555-5500',
    email: 'brian.kim@compass.com', clientScenario: 'Client selling current home and buying new one simultaneously. Needs bridge loan of $800K against current home (valued at $1.5M, owes $400K) to make non-contingent offer on new property.',
    propertyAddress: '2100 Benedict Canyon Dr, Beverly Hills, CA 90210', estimatedValue: 1500000,
    loanAmountNeeded: 800000, status: 'Contacted',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), notes: 'Strong deal, current home in escrow'
  }
];

export const mockInvestorLeads = [
  {
    id: 'i1', name: 'Richard Amato', email: 'ramato@investcorp.net',
    subscribeToDeals: true, submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    status: 'New', notes: ''
  },
  {
    id: 'i2', name: 'Patricia Hoffman', email: 'p.hoffman@gmail.com',
    subscribeToDeals: true, submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    status: 'Contacted', notes: 'Interested in 1st position TDs, $250K minimum'
  }
];

export const pipelineColumns = [
  { id: 'New Lead', title: 'New Lead' },
  { id: 'Contacted', title: 'Contacted' },
  { id: 'Soft Pull Done', title: 'Soft Pull Done' },
  { id: 'Approved', title: 'Approved' },
  { id: 'Closed', title: 'Closed' }
];
