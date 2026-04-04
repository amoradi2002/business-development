export const mockLeads = [
  {
    id: '1', name: 'Vartan Keshishyan', phone: '(818) 442-0917', email: 'vartan.keshishyan@gmail.com',
    loanType: 'Hard Money Bridge', propertyType: 'SFR', propertyAddress: '1847 Glenoaks Blvd, Glendale, CA 91201',
    propertyValue: 1250000, loanBalance: 0, desiredAmount: 750000, loanTerm: '12 months',
    interestRate: 10.5, monthlyPayment: 6563, ltv: 60, status: 'New',
    submittedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), notes: '',
    firstName: 'Vartan', lastName: 'Keshishyan', city: 'Glendale', zip: '91201', state: 'California',
    coBorrower: 'No', loanPurpose: 'Purchasing a home I\'ve already found', income: 18000
  },
  {
    id: '2', name: 'Ani Mkrtchyan', phone: '(818) 573-2841', email: 'ani.mkrtchyan@gmail.com',
    loanType: 'HELOC', propertyType: 'Condo', propertyAddress: '412 S Glenoaks Blvd, Burbank, CA 91502',
    propertyValue: 890000, loanBalance: 270000, desiredAmount: 620000, loanTerm: '10yr',
    interestRate: 8.75, monthlyPayment: 4521, ltv: 70, status: 'Contacted',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), notes: 'Self-employed, needs HELOC for business cash flow',
    firstName: 'Ani', lastName: 'Mkrtchyan', city: 'Burbank', zip: '91502', state: 'California',
    coBorrower: 'No', loanPurpose: 'Refinance my existing loan balance', income: 9500
  },
  {
    id: '3', name: 'Carlos Mendoza', phone: '(818) 694-3158', email: 'carlos.mendoza77@gmail.com',
    loanType: 'Cash-Out Refinance', propertyType: 'Multifamily', propertyAddress: '2234 W Magnolia Blvd, Burbank, CA 91506',
    propertyValue: 2100000, loanBalance: 800000, desiredAmount: 1400000, loanTerm: '30yr',
    interestRate: 7.25, monthlyPayment: 8458, ltv: 67, status: 'Soft Pull Done',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(), notes: 'Owns 4-plex, wants cash out for additional property acquisition',
    firstName: 'Carlos', lastName: 'Mendoza', city: 'Burbank', zip: '91506', state: 'California',
    coBorrower: 'Yes', loanPurpose: 'Refinance my existing loan balance', income: 24000
  },
  {
    id: '4', name: 'Sofia Petrosian', phone: '(818) 305-7462', email: 'sofia.petrosian@gmail.com',
    loanType: 'Rehab Loan', propertyType: 'SFR', propertyAddress: '918 E Chevy Chase Dr, Glendale, CA 91205',
    propertyValue: 980000, loanBalance: 0, desiredAmount: 580000, loanTerm: '12 months',
    interestRate: 11.5, monthlyPayment: 5558, ltv: 59, status: 'New',
    submittedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), notes: '',
    firstName: 'Sofia', lastName: 'Petrosian', city: 'Glendale', zip: '91205', state: 'California',
    coBorrower: 'No', loanPurpose: 'Other', income: 14000
  },
  {
    id: '5', name: 'Armen Baghdasaryan', phone: '(818) 821-9034', email: 'armen.baghdasaryan@gmail.com',
    loanType: 'Construction Loan', propertyType: 'Multifamily', propertyAddress: '3301 W Burbank Blvd, Burbank, CA 91505',
    propertyValue: 3000000, loanBalance: 0, desiredAmount: 1800000, loanTerm: '24 months',
    interestRate: 11.99, monthlyPayment: 17985, ltv: 60, status: 'Qualified',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), notes: 'Plans to build 8-unit multifamily. Has architect plans and permits ready.',
    firstName: 'Armen', lastName: 'Baghdasaryan', city: 'Burbank', zip: '91505', state: 'California',
    coBorrower: 'Yes', loanPurpose: 'Construction', income: 52000
  },
  {
    id: '6', name: 'Rosa Gutierrez', phone: '(818) 467-1293', email: 'rosa.gutierrez@gmail.com',
    loanType: 'Purchase', propertyType: 'SFR', propertyAddress: '724 N Lima St, Burbank, CA 91505',
    propertyValue: 875000, loanBalance: 0, desiredAmount: 612000, loanTerm: '30yr',
    interestRate: 7.0, monthlyPayment: 3570, ltv: 70, status: 'Contacted',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), notes: 'First-time homebuyer, strong W2 income',
    firstName: 'Rosa', lastName: 'Gutierrez', city: 'Burbank', zip: '91505', state: 'California',
    coBorrower: 'No', loanPurpose: 'Purchasing a home I\'ve already found', income: 11000
  },
  {
    id: '7', name: 'David Hakobyan', phone: '(626) 358-4710', email: 'david.hakobyan@gmail.com',
    loanType: 'Second Mortgage', propertyType: 'SFR', propertyAddress: '1502 E Colorado St, Pasadena, CA 91106',
    propertyValue: 1450000, loanBalance: 580000, desiredAmount: 870000, loanTerm: '15yr',
    interestRate: 9.5, monthlyPayment: 6888, ltv: 60, status: 'Approved',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), notes: 'Strong equity position. Funds for new business venture.',
    firstName: 'David', lastName: 'Hakobyan', city: 'Pasadena', zip: '91106', state: 'California',
    coBorrower: 'Yes', loanPurpose: 'Other', income: 32000
  },
  {
    id: '8', name: 'Maria Castellanos', phone: '(818) 729-5846', email: 'maria.castellanos@gmail.com',
    loanType: 'Hard Money Bridge', propertyType: 'Commercial', propertyAddress: '5847 Lankershim Blvd, North Hollywood, CA 91601',
    propertyValue: 1800000, loanBalance: 500000, desiredAmount: 1100000, loanTerm: '6 months',
    interestRate: 10.5, monthlyPayment: 9625, ltv: 61, status: 'In Progress',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), notes: 'Needs bridge to permanent financing. Commercial retail space.',
    firstName: 'Maria', lastName: 'Castellanos', city: 'North Hollywood', zip: '91601', state: 'California',
    coBorrower: 'No', loanPurpose: 'Refinance my existing loan balance', income: 45000
  },
  {
    id: '9', name: 'Tigran Sargsyan', phone: '(818) 613-0274', email: 'tigran.sargsyan@gmail.com',
    loanType: 'HELOC', propertyType: 'SFR', propertyAddress: '2109 N Frederic St, Burbank, CA 91505',
    propertyValue: 1100000, loanBalance: 330000, desiredAmount: 770000, loanTerm: '10yr',
    interestRate: 8.75, monthlyPayment: 5615, ltv: 70, status: 'New',
    submittedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), notes: '',
    firstName: 'Tigran', lastName: 'Sargsyan', city: 'Burbank', zip: '91505', state: 'California',
    coBorrower: 'No', loanPurpose: 'Refinance my existing loan balance', income: 16000
  },
  {
    id: '10', name: 'Elena Movsisyan', phone: '(818) 248-6391', email: 'elena.movsisyan@gmail.com',
    loanType: 'Acquisition and Development', propertyType: 'Raw Land', propertyAddress: '4455 San Fernando Rd, Glendale, CA 91204',
    propertyValue: 2400000, loanBalance: 0, desiredAmount: 1440000, loanTerm: '24 months',
    interestRate: 10.99, monthlyPayment: 13188, ltv: 60, status: 'Closed',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(), notes: 'Raw land acquisition for mixed-use development. Closed successfully.',
    firstName: 'Elena', lastName: 'Movsisyan', city: 'Glendale', zip: '91204', state: 'California',
    coBorrower: 'Yes', loanPurpose: 'Construction', income: 60000
  }
];

export const mockBrokerLeads = [
  {
    id: 'b1', brokerName: 'Gevorg Harutyunyan', companyName: 'Ararat Mortgage Group', phone: '(818) 552-3100',
    email: 'gevorg@araratmortgage.com', borrowerScenario: 'Client has 4-unit multifamily in Glendale, needs $1.2M bridge loan to purchase adjacent lot. Current property appraised at $2.1M, no existing liens. Borrower is self-employed, 680 FICO.',
    propertyAddress: '1450 E Colorado St, Glendale, CA 91205', city: 'Glendale', zip: '91205',
    loanAmount: 1200000, propertyValue: 2100000, loanPurpose: 'Bridge to construction',
    status: 'New', submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), notes: ''
  },
  {
    id: 'b2', brokerName: 'Lourdes Ramirez', companyName: 'SoCal Premier Lending', phone: '(818) 467-2200',
    email: 'lourdes@socalpremier.com', borrowerScenario: 'Self-employed borrower buying SFR in Burbank. $1.1M property, 30% down, needs $770K loan. Bank-statement program preferred, 2 years in business, strong deposits.',
    propertyAddress: '2340 N Screenland Dr, Burbank, CA 91505', city: 'Burbank', zip: '91505',
    loanAmount: 770000, propertyValue: 1100000, loanPurpose: 'Purchase',
    status: 'Contacted', submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), notes: 'Verified bank statements, strong cash flow'
  },
  {
    id: 'b3', brokerName: 'Hrant Hovhannisyan', companyName: 'Eagle Rock Financial', phone: '(626) 381-3300',
    email: 'hrant@eaglerockfinancial.com', borrowerScenario: 'Investor needs rehab loan for duplex in Glendale. Purchase price $850K, rehab budget $200K. ARV estimated $1.3M. Experienced flipper with 12 completed projects.',
    propertyAddress: '1120 S Glendale Ave, Glendale, CA 91205', city: 'Glendale', zip: '91205',
    loanAmount: 680000, propertyValue: 850000, loanPurpose: 'Rehab',
    status: 'New', submittedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), notes: ''
  }
];

export const mockRealtorLeads = [
  {
    id: 'r1', realtorName: 'Narine Avagyan', licenseNumber: '02145678', phone: '(818) 634-4400',
    email: 'narine@bhhscal.com', clientScenario: 'Buyer interested in $1.4M home in Toluca Lake. Pre-approved by bank fell through due to self-employment income docs. Needs private money to close before seller deadline.',
    propertyAddress: '4800 Cahuenga Blvd, Toluca Lake, CA 91602', estimatedValue: 1400000,
    loanAmountNeeded: 980000, status: 'New',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), notes: ''
  },
  {
    id: 'r2', realtorName: 'Miguel Fuentes', licenseNumber: '01987654', phone: '(818) 291-5500',
    email: 'miguel.fuentes@compass.com', clientScenario: 'Client selling current home and buying new one simultaneously. Needs bridge loan of $800K against current home in Burbank (valued at $1.5M, owes $400K) to make non-contingent offer on new property.',
    propertyAddress: '1925 N Maple St, Burbank, CA 91505', estimatedValue: 1500000,
    loanAmountNeeded: 800000, status: 'Contacted',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), notes: 'Strong deal, current home in escrow'
  }
];

export const mockInvestorLeads = [
  {
    id: 'i1', name: 'Gagik Abrahamyan', email: 'gagik.abrahamyan@gmail.com',
    subscribeToDeals: true, submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    status: 'New', notes: ''
  },
  {
    id: 'i2', name: 'Patricia Delgado', email: 'patricia.delgado@gmail.com',
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
