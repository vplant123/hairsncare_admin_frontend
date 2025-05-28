 const data=[
    {
        categary:"nutrition",
questions:[
    {
        ques:'How many meals do you take per day ?',
        options:['One','Two','Three','Four','Fasting'],
       subQuestions:{
        Fasting:{ques:'Are you following Intermittent Fasting ?',
        options:['Yes','No']
       }
    },
        banner:"/assets/img/question/meals.png"
    },
    {
        ques:'Do you eat Fruits & Salads regularly in your diet ?',
        options:['Yes','No'],
        banner:'/assets/img/question/fruits.png'
    },
    {
        ques:'Do you consume fast food frequently ?',
        options:['Yes','No'],
        banner:'/assets/img/question/food.png'
    },
    {
        ques:'What is your eating pattern ?',
        banner:'/assets/img/question/eat.png',
        options:[
            {name:'Veg',
        src:'/assets/img/question/veg.png'
        },
        {name:'Non-Veg',
        src:'/assets/img/question/non-veg.png'
        },
        {name:'Eggetarian',
        src:'/assets/img/question/egg.png'
        },
        {name:'Vegan',
        src:'/assets/img/question/vegan.png'
        }
        ]
    },
    {
        ques:'Are you following any diet plan from any dietician?',
        options:['Yes','No'],
        subQuestions: {
            Yes:{
                ques:'Please specify',
                options:[
                    {name:'Not Sure',
                src:'/assets/img/question/specify-pic1.png'
                },
                {name:'Liquid Diet',
                src:'/assets/img/question/specify-pic2.png'
                },
                {name:'Keto / Low Carb / Paleo',
                src:'/assets/img/question/specify-pic3.png'
                },
                {name:'Vegan',
                src:'/assets/img/question/vegan.png'
                },
                {
                    name:'Raw Food (Fruits, Salads)',
                    src:'/assets/img/question/specify-pic5.png'
                },
                {
                    name:'High Carb / Fast Food',
                    src:'/assets/img/question/specify-pic6.png'
                },
                {
                    name:'Any Other',
                    src:'/assets/img/question/specify-pic7.png'
                }
                ]
            }
        },
        banner:'/assets/img/question/dietician.png'
    },
    {
        ques:'Do you make a conscious effort to stay hydrated (at least 7-8 Glasses approximately) throughout the day ?',
        options:['Yes','No'],
        banner:'/assets/img/question/hydrated.png'
    },
    {
        ques:'Do you avoid any foods due to allergy concerns ?',
        options:['Yes','No'],
        banner:'/assets/img/question/allergy.png'
    },
    {
        ques:'Do you catch colds or infections frequently ?',
        banner:'/assets/img/cold-female.jpg',
        banner1:"/assets/img/cold-male.jpg",
        options:['Yes','No']
    },
    {
        ques:'Do you consume any Supplements like WHEY Protein / Creatinine / Steroids etc. for muscle building ? (*Select all that applies)',
        multi:true,
        banner:'/assets/img/question/supplement.png',
        options:[
            {name:'Whey proteins',
        src:'/assets/img/question/proteins.png'
        },
        {name:'Creatine / Amino acids',
        src:'/assets/img/question/amino.png'
        },
        {name:'Steroids',
        src:'/assets/img/question/steriod.png'
        },
        {name:'Other',
        src:'/assets/img/question/other.png'
        },
        {
            name:"None",
            src:null
        }
        ]
    },
    {
        ques:'Do you have any vitamin deficiencies / nutritional deficiencies that you are aware of ?',
        options:['Yes','No','Not Sure'],
        title: ['','',' '],

        subQuestions: {
            Yes:{
                ques:'Please specify',
                options:'input'
            }
        },
        banner:'/assets/img/question/vitamin.png'
    }

]
},
{
    categary:"Lifestyle",
questions:[
    {
        ques:'Do you follow any routine physical activities ? (*Select all that applies)',
        multi:true,
        specify:true,
        banner:'/assets/img/question/physical.png',
        options:['None','Walking & Jogging','Strenous Exercise',"Sports Activity",'Others'],
        subQuestions:{
            Others:{
                ques:'Please specify',
                options:'input'
            }
        }
    },
    {
        ques:'How will you describe your sleep ?',
        banner:'/assets/img/question/sleep.png',
        options:[
            {name:'Normal (Light Sleep)',
        src:'/assets/img/question/sleep1.png'
        },
        {name:'Peaceful',
        src:'/assets/img/question/sleep2.png'
        },
        {name:"Disturbed (Interrupted Sleep)",
        src:'/assets/img/question/sleep3.png'
        },
        {name:'Not able to describe',
        src:'/assets/img/question/sleep4.png'
        }
        ]
    },
    {
        ques:'Any habits like consumption of Alcohol / Smoking / Drugs addiction ?',
        options:['Yes','No','Occasionally'],
        banner:'/assets/img/question/drug.png'
    },
    {
        ques:'Do you typically spend time with friends and family on weekends ?',
        options:['Yes','No','Occasionally'],
        banner:'/assets/img/question/family.png'
    },
    {
        ques:'Are you having constipation ?',
        options:['Yes','No','Sometimes'],
        banner:'/assets/img/question/constipation.png'
    },
    {
        ques:'Which regular hair care practices do you follow ? (*Select all that applies) ?',
        banner:'/assets/img/hair.jpg',
        multi:true,
        options:[
            {name:'Regular Shampooing & Conditioning',
        src:'/assets/img/question/practices-pic1.png'
        },
        {name:'Heat Styling / Tight Hairstyle',
        src:'/assets/img/question/practices-pic2.png'
        },
        {name:"Chemical Treatments / Keratin",
        src:'/assets/img/question/practices-pic3.png'
        },
        {name:'Trimming / Drying',
        src:'/assets/img/question/practices-pic4.png'
        },
        {name:'None of these',
        src:'/assets/img/question/practices-pic5.png'
        }
        ]
    },
]
},
{
categary:'Personal',
questions:[
    {ques:'Select your age group',
options:['13-25','25-40','40+']
},
{
    ques:'Gender',
    options:[{src:'/assets/img/question/male.svg'},{src:'/assets/img/question/female.svg'}]
}
]
},
{
    categary:'Stress',

    questions:[{
        banner:'/assets/img/question/stress.png',
        items:['Physical exercise','Sound sleep','Healthy eating','Yoga/Meditation','Positive thinking','Social/ Medical support','Feeling Anxious/Depressed']
    }]
},
{
    steps: [
        {
            step: 1,
            banner: '/assets/img/Course-of-Hair-Loss---male.jpg',
            questions: [
                {
                    ques: 'Course of Hair Loss?',
                    options: ['Acute', 'Chronic Intermittent', 'Chronic Persistent'],
                    title: ['Acute (sudden and significant loss of hair within a relatively short period)', 'Chronic Intermittent (long-lasting and periodic hair loss)', 'Chronic Persistent (long-lasting and continuous hair loss)']
                },
                {
                    ques: 'Describe the rate at which your hair loss has occurred?',
                    options: ['Fast progressive hair loss', 'Slow progressive hair loss'],
                    title: ['Fast progressive hair loss (rapid, more apparent and noticeable)', 'Slow progressive hair loss (gradual, steady rate, less apparent and Unnoticeable)']
                },
                {
                    ques: 'Since how long have you been experiencing hair loss?',
                    options: ['0-3 months', 'Up to 6 months', 'More than 6 months']
                },
                {
                    ques: 'Describe shedding of your hair?',
                    options: ['Up to 40 hairs', '40 to 100 hairs', 'More than 100 hairs']
                },
                {
                    ques: 'How is your hair quality? (Select all that apply)',
                    multi: true,
                    options: [
                        { name: 'Normal', src: '/assets/img/normal.png' },
                        { name: 'Dull Hair', src: '/assets/img/5-one.png' },
                        { name: 'Frizzy Hair', src: '/assets/img/5-two.png' },
                        { name: 'Tangles easily & forms knots', src: '/assets/img/5-three.png' },
                        { name: 'Split ends', src: '/assets/img/5-four.png' },
                        { name: 'Dry Hair', src: '/assets/img/5-five.png' },
                        { name: 'Brittle hair', src: '/assets/img/5-six.png' },
                        { name: 'Greasy Hair (Oily)', src: '/assets/img/5-seven.png' }
                    ]
                }
            ]
        },
        {
            step: 2,
            banner: '/assets/img/Define-your-current-hair-status---male.jpg',
            questions: [
                {
                    ques: 'Define your current hair status?',
                    options: [
                        { name: 'Hair Loss', src: '/assets/img/Hair-Loss.png' },
                        { name: 'Hair loss and hair thinning', src: '/assets/img/Hair-loss-and-hair-thinning.png' },
                        { name: 'Bald Patches', src: '/assets/img/Bald-Patches.png' },
                        { name: 'Patchy hairloss', src: '/assets/img/Patchy-hairloss.png' },
                        { name: 'Scarring baldness', src: '/assets/img/Scarring-baldness.png' },
                        { name: 'Not Sure', src: '/assets/img/not-sure.png' }
                    ],
                    title: ['','','','','',' If none of the images match your case, please upload clear scalp photos at the end of the hair test. This will help us assess your condition accurately','No', 'Yes'],
                    subQuestions:[{
                        'Hair loss and hair thinning':[{
                            ques:'Define the area of hair thinning ?',
                            options:[
                                { name: 'Front Area', src: '/assets/img/6-1-oneb.png' },
                                { name: 'Mid Area', src: '/assets/img/6-1-twod.png' },
                                { name: 'Vertex (Crown) Area', src: '/assets/img/6-1-threec.png' },
                                { name: 'Diffuse (hair thinning from all areas of your scalp)', src: '/assets/img/6-1-foura.png' },
                              
                            ]
                        }],
                       
                    },
                    {
                        'Bald Patches':[{
                            ques:'Which image best describes your hair loss? (For Hereditary / genetic hair loss options)?',
                            options:[
                                { name: '1', src: '/assets/img/baldness1.png' },
                                { name: '2', src: '/assets/img/baldness2.png' },
                                { name: '3', src: '/assets/img/baldness3.png' },
                                { name: '4', src: '/assets/img/baldness3crown.png' },
                                { name: '5', src: '/assets/img/baldness3front.png' },
                                { name: '6', src: '/assets/img/baldness4both.png' },
                                { name: '7', src: '/assets/img/baldness4afront.png' },
                                { name: '8', src: '/assets/img/baldness5.png' },
                                { name: '9', src: '/assets/img/baldness5a.png' },
                                { name: '10', src: '/assets/img/baldness6.png' },
                                { name: '11', src: '/assets/img/baldness7.png' },
                                { name: 'Not Sure', src: '/assets/img/not-sure.png' }





                               
                              
                            ]

                        }]
                    },
                    {
                        'Patchy hairloss':[{
                            ques:'Specify your hairloss pattern ?',
                            options:[
                                { name: '1', src: '/assets/img/patchy-hairloss-pic1.png' },
                                { name: '2', src: '/assets/img/patchy-hairloss-pic2.png' },
                                { name: '3', src: '/assets/img/patchy-hairloss-pic3.png' },
                                { name: '4', src: '/assets/img/patchy-hairloss-pic4.png' },
                                { name: '5', src: '/assets/img/patchy-hairloss-pic5.png' },
                                { name: '6', src: '/assets/img/patchy-hairloss-pic6.png' },
                              
                         ],
                        },
                        {
                            ques:'Is your beard patchy or normal?',
                            options:[
                                { name: '1', src: '/assets/img/patches_on_beard.jpeg' },
                                { name: '2', src: '/assets/img/normal_beard.jpg' },
                               
   
                         ]
                        },
                        {
                            ques:'Have you noticed decreased hair on your eyebrows, axilla (underarms), chest, or pubic areas?',
                            options:[
                                'Yes','No'
   
                         ]
                        }
                    ]
                    },
                    {
                        'Scarring baldness':[{
                            ques:'Among the images presented below, which one do you feel is the most similar to your scalps current state?',
                            options:[
                                { name: '1', src: '/assets/img/scarring_hairloss1.jpg' },
                                { name: '2', src: '/assets/img/scarring_hairloss2.jpg' },
                                { name: '3', src: '/assets/img/scarring_hairloss3.jpg' },
                                { name: '4', src: '/assets/img/scarring_hairloss4.jpg' },
                                { name: '5', src: '/assets/img/scarring_hairloss5.jpg' },
                                { name: '6', src: '/assets/img/scarring_hairloss6.jpg' },
                               
                            ],
                            
                        }]
                    },
                    ]
                    
                },
                {
                    ques: 'Have you experienced any health conditions or significant illnesses in the past? (Select all that apply)',
                    multi: true,
                    options: [
                        { name: 'Normal', src: '/assets/img/none2.png' },
                        { name: 'Typhoid', src: '/assets/img/7-one.png' },
                        { name: 'Malaria / Dengue', src: '/assets/img/7-two.png' },
                        { name: 'Viral Fever', src: '/assets/img/7-three.png' },
                        { name: 'Covid', src: '/assets/img/7-four.png' },
                        { name: 'Accident / Surgery', src: '/assets/img/7-five.png' },
                        { name: 'Other', src: '/assets/img/other2.png' }
                    ],
                    subQuestions:{
                        "Other":[{
                            ques:'Please Specify',
                            options:'input'
                        }]
                    }

                },
                {
                    ques: 'Do you have signs of Thyroid?',
                    options: ['Yes', 'No', 'Not Sure'],
                    title: ['', '', ''],
                    subQuestions:[
                        {
                            Yes:[{
                                ques:'Are there any medications that you are currently taking on a regular basis ?',
                                options:['Yes','No']
                            }]
                        },
                        {
                            'Not Sure':[{
                                ques:'Please tick mark on following signs ? (Hyperthyroidism) (*Select all that applies)',
                                options:  [
                                    { name: 'Nervousness', src: '/assets/img/9-2-one.png' },
                                    { name: 'Irritability', src: '/assets/img/9-2-two.png' },
                                    { name: 'Muscle Weakness', src: '/assets/img/9-2-three.png' },
                                    { name: 'Weight Loss', src: '/assets/img/9-2-four.png' },
                                    { name: 'Trouble Sleeping', src: '/assets/img/9-2-five.png' },
                                    { name: 'Enlarged Thyroid Gland', src: '/assets/img/9-2-six.png' },
                                    { name: 'Vision Problem', src: '/assets/img/9-2-seven.png' },
                                    { name: 'Heat Sensitivity', src: '/assets/img/9-2-eight.png' }

                                ],
                                multi:true
                            },{
                                ques:'Please tick mark on following signs ? (Hypothyroidism) (*Select all that applies)',
                                options:  [
                                    { name: 'Weight Gain', src: '/assets/img/9-3-1-one.png' },
                                    { name: 'Fatigue', src: '/assets/img/9-3-1-two.png' },
                                    { name: 'Increase Sensitivity to Cold', src: '/assets/img/9-3-1-three.png' },
                                    { name: 'Constipation', src: '/assets/img/9-3-1-four.png' },
                                    { name: 'Hoarsense', src: '/assets/img/9-3-1-five.png' },
                                    { name: 'Muscle Weakness', src: '/assets/img/9-3-1-six.png' },
                                    { name: 'Depression', src: '/assets/img/9-3-1-seven.png' },
                                    { name: 'Enlarged Thyroid Gland', src: '/assets/img/9-3-1-eight.png' }

                                ],
                                multi:true
                            }
                        ]
                        }
                    ]
                },
                {
                    ques: 'Do you have low hemoglobin? (Anemia)',
                    options: ['Not Sure', 'No', 'Yes'],
                    title: ['','', ''],

                    subQuestions:[
                        {
                            'Not Sure':[{
                                ques:'Iron deficiency anemia ? (*Select all that applies)',
                                options:[
                                    { name: 'Fatigue', src: '/assets/img/10-1-one.png' },
                                    { name: 'Headache', src: '/assets/img/10-1-two.png' },
                                    { name: 'Yellowish Skin', src: '/assets/img/10-1-three.png' },
                                    { name: 'Irregular Heartbeats', src: '/assets/img/10-1-four.png' },
                                    { name: 'Chest Pain', src: '/assets/img/10-1-four.png' },
                                    { name: 'Cold Hands', src: '/assets/img/10-1-six.png' },
                                    { name: 'Leg Cramps', src: '/assets/img/10-1-seven.png' },
                                    { name: 'Disturbed Sleep', src: '/assets/img/10-1-eight.png' }
                                ],
                                multi:true
                            }]
                        }
                    ]
                }
            ]
        },
        {
            step: 3,
            banner: '/assets/img/Do-you-currently-have-any-coexisting-illnesses-or-medical-conditions--both.jpg',
            questions: [
                {
                    ques: 'Do you currently have any coexisting illnesses or medical conditions? (Select all that apply)',
                    multi: true,
                    options: [
                        { name: 'None', src: '/assets/img/none2.png' },
                        { name: 'Blood pressure', src: '/assets/img/12-one.png' },
                        { name: 'Diabetes', src: '/assets/img/12-two.png' },
                        { name: 'Heart / Liver Disease', src: '/assets/img/12-three.png' },
                        { name: 'Other', src: '/assets/img/other2.png' }
                    ],
                    subQuestions:[{
                        Other:[{
                            ques:'Please Specify',
options:'input'
                        }]
                    }]
                },
                {
                    ques: 'Are there any medications that you are currently taking on a regular basis? (Select all that apply)',
                    multi: true,
                    options: [
                        { name: 'None', src: '/assets/img/none2.png' },
                        { name: 'Blood pressure', src: '/assets/img/13-one.png' },
                        { name: 'Diabetes', src: '/assets/img/13-two.png' },
                        { name: 'Thyroid', src: '/assets/img/13-three.png' },
                        { name: 'Vitamins/ Supplement/ Steroids', src: '/assets/img/13-four.png' },
                        { name: 'Anti-psychotic', src: '/assets/img/13-eight.png' },
                        { name: 'Anti-convulsant', src: '/assets/img/13-nine.png' },
                        { name: 'Anti hormonal', src: '/assets/img/13-ten.png' },
                        { name: 'Blood Thinners', src: '/assets/img/13-eleven.png' },
                        { name: 'Not Sure', src: '/assets/img/not-sure.png' }
                    ],
                    title: ['','','','','','','','','','','No', 'Yes'],
                    subQuestions:[{
                        "Not Sure":[{
                            ques:'Please Specify',
options:'input'
                        }]
                    }]
                },
                {
                    ques: 'Any specific scalp conditions?',
                    // multi: true,
                    options: [
                        { name: 'Normal', src: '/assets/img/normal.png' },
                        { name: 'Seborrhic Dermatitis', src: '/assets/img/14-one.png' },
                        { name: 'Contact Dermatitis', src: '/assets/img/14-two.png' },
                        { name: 'Psoriasis', src: '/assets/img/14-three.png' }
                    ]
                },
                {
                    ques: 'Do you have dandruff?',
                    options: ['Yes', 'No'],
                    subQuestions:[{
                        "Yes":[{
                            ques:'What is current status of your dandruff ?',
                            options: [
                                { name: 'Mild And Seasonal', src: '/assets/img/Mild-and-Seasonal.png' },
                                { name: 'Moderate & Continuous', src: '/assets/img/Moderate-&-Continuous.png' },
                                { name: 'Severe And Thick', src: '/assets/img/Severe-and-thick.png' },
                               
                            ]
                        }]
                    }]
                },
                {
                    ques: 'Do you have gray hair?',
                    options: ['Yes', 'No'],
                    subQuestions:[{
                        Yes:[{
                            ques:'Since when did you notice your hair are greying ?',
                            options: [
                               'Before 20 Years','20-40 Years','After 40 Years'
                            ]
                        },
                        {
                            ques:'Do you have early greying complaints in the family ?',
                            options: [
                                { name: 'Father side of the family', src: '/assets/img/17-one.png' },
                                { name: 'Mother side of the family', src: '/assets/img/17-two.png' },
                                { name: 'Both', src: '/assets/img/both.png' },
                                { name: 'None', src: '/assets/img/none2.png' },
                            ]
                        },
                        {
                            ques:'Do you have gray hair in patches?',
                            options: [
                               
                                { name: 'Yes', src: '/assets/img/16-3-one.png' },
                                { name: 'No', src: '/assets/img/16-3-two.png' },
                            ]
                        },
                        {
                            ques:'Are you a frequent smoker ?',
                            options: [
                               'Yes','No'
                            ]
                        },
                        {
                            ques:'Do you frequently engage in following chemical treatments ? (*Select all that applies)',
                            multi:true,
                            options: [
                               'None','Straightening','Smoothening','Keratin','Permanent Hair Color','Other'
                            ]
                        },
                        {
                            ques:'Do you have Vitamin B12/D3 deficiency ?',
                            options: [
                               'Yes','No','Not Sure'
                            ],
                            title: ['','',' '],

                        },
                    ]
                    }]
                }
            ]
        },
        {
            step: 4,
            banner: '/assets/img/Self-Clinical-Hair-Assessment---male.jpg',
            questions: [
                {
                    ques: 'Are there any similar hair complaints in your family?',
                    options: [
                        { name: 'Father side of the family', src: '/assets/img/17-one.png' },
                        { name: 'Mother side of the family', src: '/assets/img/17-two.png' },
                        { name: 'Both', src: '/assets/img/both.png' },
                        { name: 'None', src: '/assets/img/none2.png' }
                    ]
                },
                {
                    ques: 'Did you notice any increased hair loss after taking any medications / hair cosmetics / Oils in the past year?',
                    options: ['Yes', 'No']
                },
                {
                    ques: 'Have you visited a Dermatologist in the last 6 months for any hair and scalp condition?',
                    options: ['Yes', 'No']
                },
                {
                    ques: 'Have you noticed any significant weight gain or weight loss?',
                    options: ['Yes', 'No']
                }
            ]
        },
        {
            step: 5,
            banner: '/assets/img/Self-Clinical-Hair-Assessment---male.jpg',
            questions: [
                {
                    ques: 'How would you characterize the current state or texture of your hair?',
                    options: [
                        { name: 'Straight', src: '/assets/img/18-two.png' },
                        { name: 'Wavy', src: '/assets/img/18-four.png' },
                        { name: 'Curly', src: '/assets/img/18-six.png' }
                    ]
                },
                {
                    ques: 'Have you noticed any growth or boils on your scalp like any of the below?',
                    options: [
                        { name: 'None', src: '/assets/img/none2.png' },
                        { name: 'Wart on scalp', src: '/assets/img/19-one.png' },
                        { name: 'Haemangioma on the scalp', src: '/assets/img/19-two.png' },
                        { name: 'Boil on scalp', src: '/assets/img/19-three.png' },
                        { name: 'Seborrheic Keratosis on Scalp', src: '/assets/img/19-four.png' },
                        { name: 'Other', src: '/assets/img/other2.png' }
                    ]
                },
                {
                    ques: 'How would you characterize the current state or texture of your hair scalp? (Select all that apply)',
                    multi: true,
                    options: [
                        { name: 'Normal', src: '/assets/img/normal-hair-scalp-skin-male.png' },
                        { name: 'Oily', src: '/assets/img/oily-hair-scalp-skin-male.png' },
                        { name: 'Dry', src: '/assets/img/dry-hair-scalp-skin-male.png' },
                        { name: 'Dry & Flaky', src: '/assets/img/dry-&-Flakry-hair-scalp-skin-male.png' },
                        { name: 'Redness', src: '/assets/img/redness-in-scalp-skin-male.png' }
                    ]
                },
                {
                    ques: 'How would you describe the density of your hair?',
                    options: [
                        { name: 'Normal', src: '/assets/img/normal-density-of-hair-male.png' },
                        { name: 'Decreased Hair Density', src: '/assets/img/decressed-hair-density-of-hair-male.png' }
                    ]
                },
                {
                    ques: 'Have you experienced any gradual fading of your natural hair color over time?',
                    options: ['Yes', 'No']
                },
                {
                    ques: 'How would you describe your Eyebrows / Eyelashes?',
                    options: ['Normal', 'Abnormal']
                }
            ]
        },
        {
            step:6,
            banner: '/assets/img/SELF-HAIR-ANALYSIS-TEST-female.jpg',
            questions: [
                {
                    h4:'HAIR PULL TEST (Optional)',
                    ques: 'Grasp around 20 to 60 hair between the thumb, index and middle fingers from base of the hair near the scalp and pull away from it with a gentle but firm pressure',
                    options: [
                  'Skip Test','Take Test'
                ],
                subQuestions:[{
                    "Take Test":[{
                        ques:'',
                        options:['Positive','Negative'],
                        title : ['Positive: if more than 10% hair (6 to 10 hairs)','Negative: if less than 10% hair (less than 6 hairs)']
                    }]
                }]
            },
            {                     
                h4:'HAIR COUNT & BREAKAGE TEST (Optional)',
                ques: 'Comb hair for 60 seconds over a pillow or sheet of contrasting color, starting with the comb at the back of the scalp and moving towards the front of the scalp',
                          options: [
                  'Skip Test','Take Test'
                ],
                subQuestions:[{
                    "Take Test":[{
                        ques:'(a) What do you observe ?',
                        options:['Upto 30','Upto 30-60','Above 60']
                    },{
                        ques:'(b) Do you observe hair breakage ?',
                        options:["Yes","No"]
                    }
                ]
                }]
            },{
                ques:'Your main hair goals are ? (*Select all that applies)',
                multi:true,
                options:['Stop Hair Fall','Hair thickness','cure baldness','Hair Maintenance','Stop Dandruff','Reduce Greying','Soft Shine Hair'],
                title:['Stop Hair Fall','Increase Hair thickness','Get Rid of Baldness','Maintenance of Hair','Stop Dandruff','Reduce Greying','Soft, shine, colour protection of hair']

            }
            ]
        }
    ]
},
{
    steps: [
        {
            step: 1,
            banner: '/assets/img/Course-of-Hair-Loss---female.jpg',
           
            questions: [
                {
                    ques: 'Course of Hair Loss?',
                    options: ['Acute', 'Chronic Intermittent', 'Chronic Persistent'],
                    title: ['Acute (sudden and significant loss of hair within a relatively short period)', 'Chronic Intermittent (long-lasting and periodic hair loss)', 'Chronic Persistent (long-lasting and continuous hair loss)']
                },
                {
                    ques: 'Describe the rate at which your hair loss has occurred?',
                    options: ['Fast progressive hair loss', 'Slow progressive hair loss'],
                    title: ['Fast progressive hair loss (rapid, more apparent and noticeable)', 'Slow progressive hair loss (gradual, steady rate, less apparent and Unnoticeable)']
                },
                {
                    ques: 'Since how long have you been experiencing hair loss?',
                    options: ['0-3 months', 'Up to 6 months', 'More than 6 months']
                },
                {
                    ques: 'Describe shedding of your hair?',
                    options: ['Up to 40 hairs', '40 to 100 hairs', 'More than 100 hairs']
                },
                {
                    ques: 'How is your hair quality? (Select all that apply)',
                    multi: true,
                    options: [
                        { name: 'Normal', src: '/assets/img/normal.png' },
                        { name: 'Dull Hair', src: '/assets/img/5-one.png' },
                        { name: 'Frizzy Hair', src: '/assets/img/5-two.png' },
                        { name: 'Tangles easily & forms knots', src: '/assets/img/5-three.png' },
                        { name: 'Split ends', src: '/assets/img/5-four.png' },
                        { name: 'Dry Hair', src: '/assets/img/5-five.png' },
                        { name: 'Brittle hair', src: '/assets/img/5-six.png' },
                        { name: 'Greasy Hair (Oily)', src: '/assets/img/5-seven.png' }
                    ]
                }
            ]
        },
        {
            step: 2,
            banner: '/assets/img/Define-your-current-hair-status---female.jpg',
            
            questions: [
                {
                    ques: 'Define your current hair status?',
                    options: [
                        { name: 'Hair Loss', src: '/assets/img/hair-one.png' },
                        { name: 'Hair loss and hair thinning', src: '/assets/img/hair-two.png' },
                        { name: 'Bald Patches', src: '/assets/img/hair-three.png' },
                        { name: 'Patchy hairloss', src: '/assets/img/hair-four.png' },
                        { name: 'Scarring baldness', src: '/assets/img/hair-five.png' },
                        { name: 'Not Sure', src: '/assets/img/not-sure.png' }
                    ],
                    title: ['','','','','',' If none of the images match your case, please upload clear scalp photos at the end of the hair test. This will help us assess your condition accurately','No', 'Yes'],

                    subQuestions:[{
                        'Hair loss and hair thinning':[{
                            ques:'Define the area of hair thinning ?',
                            options:[
                                { name: 'Mild thinning', src: '/assets/img/6-1-one.png' },
                                { name: 'Moderate thinning', src: '/assets/img/6-1-two.png' },
                                { name: 'Diffuse thinning', src: '/assets/img/6-1-three.png' },
                               
                              
                            ]
                        }],
                       
                    },
                    {
                        'Bald Patches':[{
                            ques:'Which image best describes your hair loss? (For Hereditary / genetic hair loss options)?',
                            options:[
                                { name: '1', src: '/assets/img/baldness-one.png' },
                                { name: '2', src: '/assets/img/baldness-two.png' },
                                { name: '3', src: '/assets/img/baldness-three.png' },
                                { name: '4', src: '/assets/img/baldness-four.png' },
                                { name: '5', src: '/assets/img/baldness-five.png' },
                                
                                { name: '6', src: '/assets/img/baldness-six.png' },
                                { name: '7', src: '/assets/img/baldness-seven.png' },
                                { name: '8', src: '/assets/img/baldness-eight.png' },
                                { name: '9', src: '/assets/img/baldness-nine.png' },
                                { name: 'Not Sure', src: '/assets/img/not-sure.png' }
                               
                            ],

                        }]
                    },
                    {
                        'Patchy hairloss':[{
                            ques:'Specify your hairloss pattern ?',
                            options:[
                                { name: '1', src: '/assets/img/patchy-hairloss-pic1.png' },
                                { name: '2', src: '/assets/img/patchy-hairloss-pic2.png' },
                                { name: '3', src: '/assets/img/patchy-hairloss-pic3.png' },
                                { name: '4', src: '/assets/img/patchy-hairloss-pic4.png' },
                                { name: '5', src: '/assets/img/patchy-hairloss-pic5.png' },
                                { name: '6', src: '/assets/img/patchy-hairloss-pic6.png' },
                                { name: 'Not Sure', src: '/assets/img/not-sure.png' }

                         ],
                         title: ['','','','','','',' If none of the images match your case, please upload clear scalp photos at the end of the hair test. This will help us assess your condition accurately','No', 'Yes'],
                        },
                       
                        {
                            ques:'Have you noticed decreased hair on your eyebrows, axilla (underarms), chest, or pubic areas?',
                            options:[
                                'Yes','No'
   
                         ]
                        }
                    ]
                    },
                    {
                        'Scarring baldness':[{
                            ques:'Among the images presented below, which one do you feel is the most similar to your scalps current state?',
                            options:[
                                { name: '1', src: '/assets/img/scarring_hairloss1.jpg' },
                                { name: '2', src: '/assets/img/scarring_hairloss2.jpg' },
                                { name: '3', src: '/assets/img/scarring_hairloss3.jpg' },
                                { name: '4', src: '/assets/img/scarring_hairloss4.jpg' },
                                { name: '5', src: '/assets/img/scarring_hairloss5.jpg' },
                                { name: '6', src: '/assets/img/scarring_hairloss6.jpg' },
                                { name: 'Not Sure', src: '/assets/img/not-sure.png' }
                               
                            ],
                            title: ['','','','','','',' If none of the images match your case, please upload clear scalp photos at the end of the hair test. This will help us assess your condition accurately','No', 'Yes'],
                        }]
                    },
                    ]
                    
                },
                {
                    ques: 'Have you experienced any health conditions or significant illnesses in the past? (Select all that apply)',
                    multi: true,
                    options: [
                        { name: 'None', src: '/assets/img/none2.png' },
                        { name: 'Typhoid', src: '/assets/img/7-one.png' },
                        { name: 'Malaria / Dengue', src: '/assets/img/7-two.png' },
                        { name: 'Viral Fever', src: '/assets/img/7-three.png' },
                        { name: 'Covid', src: '/assets/img/7-four.png' },
                        { name: 'Accident / Surgery', src: '/assets/img/7-five.png' },
                        { name: 'Other', src: '/assets/img/other2.png' }
                    ],
                    subQuestions:[{
                        Other:[{
                            ques:'Please Specify',
                            options:'input'
                        }]
                    }
                ]

                },
                {
                    ques: 'Do you have PCOD (Polycystic Ovarian Disease) ?',
                    options: ['Yes',  'Not Sure'],
                    title: ['',''],
                    subQuestions:[
                        {
                            'Not Sure':[{
                                ques:'Is your Menstrual cycle regular ?',
                                options:['Yes','No']
                            },
                            {
                                ques:'Do you have excessive hair growth on face,chest,back or buttocks ?',
                                options:['Yes','No']
                            },
                            {
                                ques:'Have you had any previous or current struggles with pregnancy ?',
                                options:['Yes','No']
                            },
                            {
                                ques:'Do you have Acne (Pimples) on face or body ?',
                                options:['Yes','No']
                            },
                            {
                                ques:'Have you noticed any dark patches in the areas where your skin folds ?',
                                options:['Yes','No']
                            },
                            {
                                ques:'Have you noticed any signs of depression, mood swings, or anxiety ?',
                                options:['Yes','No']
                            },
                        ]
                        },
                      
                    ]
                },
                {
                    ques: 'Do you have signs of Thyroid?',
                    options: ['Yes', 'No', 'Not Sure'],
                    title: ['','',''],

                    subQuestions:[
                        {
                            Yes:[{
                                ques:'Are there any medications that you are currently taking on a regular basis ?',
                                options:['Yes','No']
                            }]
                        },
                        {
                            'Not Sure':[{
                                ques:'Please tick mark on following signs ? (Hyperthyroidism) (*Select all that applies)',
                                options:  [
                                    { name: 'Nervousness', src: '/assets/img/9-2-one.png' },
                                    { name: 'Irritability', src: '/assets/img/9-2-two.png' },
                                    { name: 'Muscle Weakness', src: '/assets/img/9-2-three.png' },
                                    { name: 'Weight Loss', src: '/assets/img/9-2-four.png' },
                                    { name: 'Trouble Sleeping', src: '/assets/img/9-2-five.png' },
                                    { name: 'Enlarged Thyroid Gland', src: '/assets/img/9-2-six.png' },
                                    { name: 'Vision Problem', src: '/assets/img/9-2-seven.png' },
                                    { name: 'Heat Sensitivity', src: '/assets/img/9-2-eight.png' }

                                ],
                                multi:true
                            },
                            {
                                ques:'Please tick mark on following signs ? (Hypothyroidism) (*Select all that applies)',
                                options:  [
                                    { name: 'Weight Gain', src: '/assets/img/9-3-1-one.png' },
                                    { name: 'Fatigue', src: '/assets/img/9-3-1-two.png' },
                                    { name: 'Increase Sensitivity to Cold', src: '/assets/img/9-3-1-three.png' },
                                    { name: 'Constipation', src: '/assets/img/9-3-1-four.png' },
                                    { name: 'Hoarsense', src: '/assets/img/9-3-1-five.png' },
                                    { name: 'Muscle Weakness', src: '/assets/img/9-3-1-six.png' },
                                    { name: 'Depression', src: '/assets/img/9-3-1-seven.png' },
                                    { name: 'Enlarged Thyroid Gland', src: '/assets/img/9-3-1-eight.png' }

                                ],
                                multi:true
                            }]
                        }
                    ]
                },
                {
                    ques: 'Do you have low hemoglobin? (Anemia)',
                    options: ['Not Sure', 'No', 'Yes'],
                    title: ['','', ''],
                    subQuestions:[
                        {
                            'Not Sure':[{
                                ques:'Are there any medications that you are currently taking on a regular basis ?',
                                options:[
                                    { name: 'Fatigue', src: '/assets/img/10-1-one.png' },
                                    { name: 'Headache', src: '/assets/img/10-1-two.png' },
                                    { name: 'Yellowish Skin', src: '/assets/img/10-1-three.png' },
                                    { name: 'Irregular Heartbeats', src: '/assets/img/10-1-four.png' },
                                    { name: 'Chest Pain', src: '/assets/img/10-1-four.png' },
                                    { name: 'Cold Hands', src: '/assets/img/10-1-six.png' },
                                    { name: 'Leg Cramps', src: '/assets/img/10-1-seven.png' },
                                    { name: 'Disturbed Sleep', src: '/assets/img/10-1-eight.png' }
                                ],
                                multi:true
                            }]
                        }
                    ]
                }
            ]
        },
        {
            step: 3,
            banner: '/assets/img/Do-you-currently-have-any-coexisting-illnesses-or-medical-conditions--both.jpg',
            questions: [{
                ques: 'Have you experienced significant hair loss following childbirth ?',
                options: ['Yes', 'No'],
            },
                {
                    ques: 'Do you currently have any coexisting illnesses or medical conditions? (Select all that apply)',
                    multi: true,
                    options: [
                        { name: 'None', src: '/assets/img/none2.png' },
                        { name: 'Blood pressure', src: '/assets/img/12-one.png' },
                        { name: 'Diabetes', src: '/assets/img/12-two.png' },
                        { name: 'Heart / Liver Disease', src: '/assets/img/12-three.png' },
                        { name: 'Other', src: '/assets/img/other2.png' }
                    ],
                    subQuestions:[{
                        Other:[{
                            ques:'Please Specify',
options:'input'
                        }]
                    }]
                },
                {
                    ques: 'Are there any medications that you are currently taking on a regular basis? (Select all that apply)',
                    multi: true,
                    options: [
                        { name: 'None', src: '/assets/img/none2.png' },
                        { name: 'Blood pressure', src: '/assets/img/13-one.png' },
                        { name: 'Diabetes', src: '/assets/img/13-two.png' },
                        { name: 'Thyroid', src: '/assets/img/13-three.png' },
                        { name: 'Vitamins/ Supplement/ Steroids', src: '/assets/img/13-four.png' },
                        { name: 'Anti-psychotic', src: '/assets/img/13-eight.png' },
                        { name: 'Anti-convulsant', src: '/assets/img/13-nine.png' },
                        { name: 'Anti hormonal', src: '/assets/img/13-ten.png' },
                        { name: 'Blood Thinners', src: '/assets/img/13-eleven.png' },
                        { name: 'Not Sure', src: '/assets/img/not-sure.png' }
                    ],
                    subQuestions:[{
                        "Not Sure":[{
                            ques:'Please Specify',
options:'input'
                        }]
                    }]
                },
                {
                    ques: 'Any specific scalp conditions?',
                    // multi: true,
                    options: [
                        { name: 'Normal', src: '/assets/img/normal.png' },
                        { name: 'Seborrhic Dermatitis', src: '/assets/img/14-one.png' },
                        { name: 'Contact Dermatitis', src: '/assets/img/14-two.png' },
                        { name: 'Psoriasis', src: '/assets/img/14-three.png' }
                    ]
                },
                {
                    ques: 'Do you have dandruff?',
                    options: ['Yes', 'No'],
                    subQuestions:[{
                        Yes:[{
                            ques:'What is current status of your dandruff ?',
                            options: [
                                { name: 'Mild And Seasonal', src: '/assets/img/Mild-and-Seasonal.png' },
                                { name: 'Moderate & Continuous', src: '/assets/img/Moderate-&-Continuous.png' },
                                { name: 'Severe And Thick', src: '/assets/img/Severe-and-thick.png' },
                               
                            ]
                        }]
                    }]
                },
                {
                    ques: 'Do you have gray hair?',
                    options: ['Yes', 'No'],
                    subQuestions:[{
                        "Yes":[{
                            ques:'Since when did you notice your hair are greying ?',
                            options: [
                               'Before 20 Years','20-40 Years','After 40 Years'
                            ]
                        },
                        {
                            ques:'Do you have early greying complaints in the family ?',
                            options: [
                                { name: 'Father side of the family', src: '/assets/img/17-one.png' },
                                { name: 'Mother side of the family', src: '/assets/img/17-two.png' },
                                { name: 'Both', src: '/assets/img/both.png' },
                                { name: 'None', src: '/assets/img/none2.png' },
                            ]
                        },
                        {
                            ques:'Do you have gray hair in patches?',
                            options: [
                               
                                { name: 'Yes', src: '/assets/img/16-3-one.png' },
                                { name: 'No', src: '/assets/img/16-3-two.png' },
                            ]
                        },
                        {
                            ques:'Are you a frequent smoker ?',
                            options: [
                               'Yes','No'
                            ]
                        },
                        {
                            ques:'Do you frequently engage in following chemical treatments ? (*Select all that applies)',
                            multi:true,
                            options: [
                               'None','Straightening','Smoothening','Keratin','Permanent Hair Color','Other'
                            ]
                        },
                        {
                            ques:'Do you have Vitamin B12/D3 deficiency ?',
                            options: [
                               'Yes','No','Not Sure'
                            ],
                            title: ['','',''],
                        },
                    ]
                    }]
                }
            ]
        },
        {
            step: 4,
            banner: '/assets/img/Self-Clinical-Hair-Assessment---female.jpg',
            questions: [
                {
                    ques: 'Are there any similar hair complaints in your family?',
                    options: [
                        { name: 'Father side of the family', src: '/assets/img/17-one.png' },
                        { name: 'Mother side of the family', src: '/assets/img/17-two.png' },
                        { name: 'Both', src: '/assets/img/both.png' },
                        { name: 'None', src: '/assets/img/none2.png' }
                    ]
                },
                {
                    ques: 'Did you notice any increased hair loss after taking any medications / hair cosmetics / Oils in the past year?',
                    options: ['Yes', 'No']
                },
                {
                    ques: 'Have you visited a Dermatologist in the last 6 months for any hair and scalp condition?',
                    options: ['Yes', 'No']
                },
                {
                    ques: 'Have you noticed any significant weight gain or weight loss?',
                    options: ['Yes', 'No']
                }
            ]
        },
        {
            step: 5,
            banner: '/assets/img/Self-Clinical-Hair-Assessment---female.jpg',
            questions: [
                {
                    ques: 'How would you characterize the current state or texture of your hair?',
                    options: [
                        { name: 'Straight', src: '/assets/img/18-one.png' },
                        { name: 'Wavy', src: '/assets/img/18-thee.png' },
                        { name: 'Curly', src: '/assets/img/18-five.png' }
                    ]
                },
                {
                    ques: 'Have you noticed any growth or boils on your scalp like any of the below?',
                    options: [
                        { name: 'None', src: '/assets/img/none2.png' },
                        { name: 'Wart on scalp', src: '/assets/img/19-one.png' },
                        { name: 'Haemangioma on the scalp', src: '/assets/img/19-two.png' },
                        { name: 'Boil on scalp', src: '/assets/img/19-three.png' },
                        { name: 'Seborrheic Keratosis on Scalp', src: '/assets/img/19-four.png' },
                        { name: 'Other', src: '/assets/img/other2.png' }
                        
                    ]
                },
                {
                    ques: 'How would you characterize the current state or texture of your hair scalp? (Select all that apply)',
                    multi: true,
                    options: [
                        { name: 'Normal', src: '/assets/img/1-one.png' },
                        { name: 'Oily', src: '/assets/img/1-two.png' },
                        { name: 'Dry', src: '/assets/img/1-three.png' },
                        { name: 'Dry & Flaky', src: '/assets/img/1-four.png' },
                        { name: 'Redness', src: '/assets/img/1-five.png' }
                        
                    ]
                },
                {
                    ques: 'How would you describe the density of your hair?',
                    options: [
                        { name: 'Normal', src: '/assets/img/2-one.png' },
                        { name: 'Decreased Hair Density', src: '/assets/img/2-two.png' }
                    ]
                },
                {
                    ques: 'Have you experienced any gradual fading of your natural hair color over time?',
                    options: ['Yes', 'No']
                },
                {
                    ques: 'How would you describe your Eyebrows / Eyelashes?',
                    options: ['Normal', 'Abnormal']
                }
            ]
        },
        {
            step:6,
            banner: '/assets/img/SELF-HAIR-ANALYSIS-TEST-female.jpg',
            questions: [
                { 
                    h4:'HAIR PULL TEST (Optional)',
                    ques: 'Grasp around 20 to 60 hair between the thumb, index and middle fingers from base of the hair near the scalp and pull away from it with a gentle but firm pressure',
                     options: [
                  'Skip Test','Take Test'
                ],
                subQuestions:[{
                    "Take Test":[{
                        ques:'',
                        options:['Positive','Negative'],
                        title : ['Positive: if more than 10% hair (6 to 10 hairs)','Negative: if less than 10% hair (less than 6 hairs)']
                    }]
                }]
            },
            {   h4:'HAIR COUNT & BREAKAGE TEST (Optional)',
                ques: 'Comb hair for 60 seconds over a pillow or sheet of contrasting color, starting with the comb at the back of the scalp and moving towards the front of the scalp',
                    options: [
                  'Skip Test','Take Test'
                ],
                subQuestions:[{
                    "Take Test":[{
                        ques:'(a) What do you observe ?',
                        options:['Upto 30','Upto 30-60','Above 60']
                    },{
                        ques:'(b) Do you observe hair breakage ?',
                        options:["Yes","No"]
                    }
                ]
                }]
            },
            {
                ques:'Your main hair goals are ? (*Select all that applies)',
                multi:true,
                options:['Stop Hair Fall','Hair thickness','cure baldness','Hair Maintenance','Stop Dandruff','Reduce Greying','Soft Shine Hair']
            }
            ]
        }
    ]
},   
]
export default data