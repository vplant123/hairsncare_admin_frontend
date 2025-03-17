
// import React from 'react'

// export default function Page4() {
//   return (
//     <div className='a4-page'>
//         <h1 className='hair-scalp-h1'>2) Hair & Scalp Treatment Recommendation </h1>
//         <h1 style={{textAlign:'center'}}>Assassment of <span className='span-scalp'>SCALP</span></h1>
//         <h1 className='hair-scalp-h1'>Oily Scalp</h1>
//         <div className='strong-highlight'>
//         <p>
//         Preventing hair loss involves adopting healthy hair care practices and lifestyle choices. While not all types of hair loss can be completely prevented, these general guidelines can help maintain hair health and reduce the risk of certain types of hair loss: (Read More)
//         </p>
//         <p>
//           <strong>1) Maintain a balanced diet: </strong>
//           Ensure your diet includes a variety of nutrients essential for hair health, such as protein, iron, zinc, biotin, vitamins A, C, and D, and omega-3 fatty acids. A well-balanced diet supports healthy hair growth and prevents nutritional deficiencies that may contribute to hair loss.
//         </p>
//         <p>
//           <strong>2) Avoid harsh hairstyles and treatments: </strong>Tight hairstyles (e.g., ponytails, braids), excessive heat styling, and chemical treatments (e.g., bleaching, perms) can damage hair and lead to breakage and hair loss. Opt for gentle hairstyles and limit the use of hot styling tools to protect your hair.

//         </p>
//         <p>
//           <strong>3) Use mild hair care products:</strong>Choose shampoos, conditioners, and styling products that are suitable for your hair type and do not contain harsh chemicals. Avoid products with sulfates, parabens, and alcohol, as they can strip natural oils and cause damage to the hair.

//         </p>
//         <p>
//           <strong>4) Be gentle with wet hair: </strong> Wet hair is more susceptible to damage, so avoid aggressive brushing or combing when your hair is wet. Use a wide-tooth comb or a detangling brush to gently work through knots.

//         </p>
//         <p>
//           <strong>5) Avoid over washing: </strong>Washing your hair too frequently can strip it of its natural oils, leading to dryness and potential damage. Aim to wash your hair every 2-3 days or as needed based on your hair type and lifestyle.

//         </p>
//         <p>
//           <strong>6) Safety and Regulation:</strong> Strict standards ensure
//           treatments are safe and evaluated for risks and side effects.
//         </p>
//         <p>
//           <strong>7) Protect your hair from the sun: </strong> Ongoing
//           advancements lead to improved treatment options.
//         </p>
//         </div>
//     </div>
//   )
// }



import React, { useState } from 'react';

const content = {
  "Normal Scalp": {
    heading: "SCALP",
    title: "Normal Scalp",
    paragraphs: [
      {
        strong: "",
        text: "As per your inputs and analysis your scalp condition looks normal. ",
      },
    ],
  },
  "Good": {
    heading: "Hair Quality",
    title: "Good",
    paragraphs: [
      {
        strong: "",
        text: "As per your inputs and analysis your Hair Quality condition looks Good. ",
      },
    ],
  },

  
  "hairdensity good": {
    heading: "Hair Density",
    title: "Good",
    paragraphs: [
      {
        strong: "",
        text: "As per your inputs and analysis your Hair Density condition looks Good. ",
      },
    ],
  },
  "Normal Hair Color": {
    heading: "Hair Color Vibrancy",
    title: "Normal Hair Color",
    paragraphs: [
      {
        strong: "",
        text: "As per your inputs and analysis your Hair Color Vibrancy condition looks Normal. ",
      },
    ],
  },
  "Well Hydrated": {
    heading: "Moisture and hydration of hair",
    title: "Well Hydrated",
    paragraphs: [
      {
        strong: "",
        text: "As per your inputs and analysis your Moisture and hydration of hair condition looks Normal. ",
      },
    ],
  },
  "No Breakage": {
    heading: "Hair Breakage",
    title: "No Breakage",
    paragraphs: [
      {
        strong: "",
        text: "As per your inputs and analysis your Hair Breakage condition looks Normal. ",
      },
    ],
  },

  "Oily Scalp": {
    heading: "SCALP",
    title: "Oily Scalp",
    paragraphs: [
      {
        strong: "",
        text: "Managing an oily scalp can be achieved through a combination of proper hair care, lifestyle adjustments, and the use of suitable hair products. Here are some tips to effectively manage an oily scalp:      ",
      },
      {
        strong: "1) Frequent Shampooing: ",
        text: "Use a gentle shampoo designed for oily hair to remove excess sebum.      ",
      },
      {
        strong: "2) Avoid Hot Water: ",
        text: "Wash with lukewarm water to prevent stimulating more oil production.",
      },
      {
        strong: "3) Clarifying Shampoo: ",
        text: "Use a clarifying shampoo weekly to deep-clean and remove buildup.   ",
      },
      {
        strong: "4) Scalp Focus: ",
        text: "Massage shampoo into the scalp for thorough cleansing.",
      },
      {
        strong: "5) Proper Conditioning: ",
        text: "Avoid applying conditioner to the scalp; focus on mid-lengths to ends. ",
      },
      {
        strong: "6) Choose Lightweight Products: ",
        text: "Opt for oil-free and non-comedogenic hair products.",
      },
      {
        strong: "7) Limit Brushing: : ",
        text: "Excessive brushing can distribute oil; brush as needed.      ",
      },
      {
        strong: "8) Minimize Touching: ",
        text: "Avoid unnecessary touching to prevent transferring oil.",
      },
      {
        strong: "9) Oil-Absorbing Papers: ",
        text: "Carry blotting papers or dry shampoo for oil control on-the-go.",
      },
      {
        strong: "10) Avoid Heavy Styling Products: ",
        text: "Use lightweight serums or gels recommended for oily scalps.",
      },
      {
        strong: "11) Watch Your Diet: ",
        text: "Limit greasy and fried foods that may increase oil production.",
      },
      {
        strong: "12) Stay Hydrated: ",
        text: "Drink water to regulate oil production and maintain scalp health.",
      },
      {
        strong: "13) Limit Heat Styling: ",
        text: "Air dry hair when possible and use low heat settings on styling tools.",
      },
    ],
  },
  "Dry Scalp": {
    heading: "SCALP",
    title: "Dry Scalp",
    paragraphs: [
      {
        strong: "",
        text: "Managing a dry scalp involves incorporating proper hair care practices and making lifestyle adjustments to promote scalp health and hydration. Here are some tips to effectively manage dry scalp:",
      },
      {
        strong: "1) Moisturizing Products: ",
        text: "Use shampoo and conditioner designed for dry scalp with hydrating ingredients like glycerin or coconut oil.",
      },
      {
        strong: "2) Avoid Hot Water: ",
        text: "Wash with lukewarm water to prevent stripping natural oils.",
      },
      {
        strong: "3) Shampoo Less Often: ",
        text: "Limit washing to every other day or as needed to avoid drying out the scalp.",
      },
      {
        strong: "4) Scalp Massage: ",
        text: "Stimulate blood flow by gently massaging the scalp while shampooing.",
      },
      {
        strong: "5) Scalp Oil Treatment: ",
        text: "Apply nourishing oils like jojoba or argan once a week for extra hydration.",
      },
      {
        strong: "6) Avoid Harsh Products: ",
        text: "Stay away from alcohol or chemical-laden hair products.",
      },
      {
        strong: "7) Deep Conditioning: ",
        text: "Use a hair mask regularly to restore moisture.",
      },
      {
        strong: "8) Limit Heat Styling: ",
        text: "Reduce use of heat tools and apply a heat protectant when necessary.",
      },
      {
        strong: "9) Stay Hydrated: ",
        text: "Drink plenty of water to maintain scalp hydration.",
      },
      {
        strong: "10) Healthy Diet: ",
        text: "Eat foods rich in omega-3 fatty acids for scalp health.",
      },
      {
        strong: "11) Avoid Scratching: ",
        text: "Resist scratching to prevent irritation.",
      },
      {
        strong: "12) Weather Protection: ",
        text: "Shield scalp from harsh elements with hats or scarves.",
      },
      {
        strong: "13) Limit Chemical Treatments: ",
        text: "Minimize use of perms or relaxers to avoid further dryness.",
      },
    ],
  },
  "Dry & Flaky Scalp": {
    heading: "SCALP",
    title: "Dry & Flaky Scalp",
    paragraphs: [
      {
        strong: "",
        text: "Managing a dry and flaky scalp requires a combination of scalp care, hair care, and lifestyle adjustments to promote hydration and alleviate flakiness. Here are some tips for effectively managing a dry and flaky scalp:",
      },
      {
        strong: "1) Moisturizing Products: ",
        text: "Use shampoo and conditioner designed for dry scalps with soothing ingredients like aloe vera or tea tree oil.",
      },
      {
        strong: "2) Limit Shampooing: ",
        text: "Avoid daily washing to prevent stripping natural oils; wash every other day or as needed.",
      },
      {
        strong: "3) Scalp Massage: ",
        text: "Stimulate blood flow by gently massaging while shampooing to enhance product absorption.",
      },
      {
        strong: "4) Scalp Oil Treatment: ",
        text: "Apply a nourishing scalp oil once or twice weekly with oils like jojoba or almond.",
      },
      {
        strong: "5) Cool Water: ",
        text: "Wash with lukewarm or cool water to prevent further dryness.",
      },
      {
        strong: "6) Exfoliate: ",
        text: "Use a gentle scalp scrub occasionally to remove flakes.",
      },
      {
        strong: "7) Avoid Harsh Products: ",
        text: "Stay away from alcohol or sulfate-laden products that can worsen dryness.",
      },
      {
        strong: "8) Deep Conditioning: ",
        text: "Use a hair mask regularly to restore moisture.",
      },
      {
        strong: "9) Stay Hydrated: ",
        text: "Drink plenty of water to maintain overall hydration.",
      },
      {
        strong: "10) Avoid Scratching: ",
        text: "Resist scratching to prevent irritation.",
      },
      {
        strong: "11) Healthy Diet: ",
        text: "Eat foods rich in omega-3 fatty acids for scalp health.",
      },
      {
        strong: "12) Manage Stress: ",
        text: "Practice stress-reducing activities like meditation.",
      },
      {
        strong: "13) Weather Protection: ",
        text: "Shield scalp from harsh elements with hats or scarves.",
      },
    ],
  },
  "Red and Irritated Scalp": {
    heading: "SCALP",
    title: "Red and Irritated Scalp",
    paragraphs: [
      {
        strong: "",
        text: "If you're experiencing a red and irritated scalp, there are several management tips you can try to alleviate the discomfort. However, it's essential to consult a healthcare professional or dermatologist for a proper diagnosis and personalized treatment plan. Here are some general management tips:",
      },
      {
        strong: "1) Keep Scalp Clean: ",
        text: "Use a gentle, sulfate-free shampoo and avoid harsh hair products.",
      },
      {
        strong: "2) Avoid Scratching: ",
        text: "Resisting scratching prevents further irritation.",
      },
      {
        strong: "3) Moisturize: ",
        text: "Apply soothing creams with aloe vera or chamomile to reduce inflammation.",
      },
      {
        strong: "4) Limit Heat and Styling: ",
        text: "Minimize use of heat tools and styling products.",
      },
      {
        strong: "5) Identify Triggers: ",
        text: "Discontinue products causing reactions.",
      },
      {
        strong: "6) Sun Protection: ",
        text: "Wear a hat or use scalp sunscreen.",
      },
      { strong: "7) Manage Stress: ", text: "Practice relaxation techniques." },
      {
        strong: "8) Use Cool Water: ",
        text: "Wash with cool water to avoid stripping natural oils.",
      },
      {
        strong: "9) Avoid Tight Hairstyles: ",
        text: "Reduce pressure on the scalp.",
      },
      {
        strong: "",
        text: "Remember, these tips are general suggestions and may not be suitable for everyone or for specific conditions.",
      },
    ],
  },
  "Dull Hair": {
    heading: "HAIR QUALITY",
    title: "Dull Hair",
    paragraphs: [
      {
        strong: "",
        text: "If you're dealing with dull hair, there are several management tips you can follow to improve its appearance and overall health. Here are some suggestions:",
      },
      {
        strong: "1) Healthy Diet: ",
        text: "Include a variety of fruits, vegetables, nuts, seeds, fish, and lean meats for essential nutrients.",
      },
      {
        strong: "2) Stay Hydrated: ",
        text: "Drink plenty of water daily to keep hair and scalp hydrated.",
      },
      {
        strong: "3) Gentle Hair Care: ",
        text: "Use sulfate-free, silicone-free shampoos and conditioners to maintain moisture.",
      },
      {
        strong: "4) Limit Heat Styling: ",
        text: "Minimize use of heat tools or use lowest heat settings.",
      },
      {
        strong: "5) Sun Protection: ",
        text: "Wear hats or use UV protection products to shield hair from sun damage.",
      },
      {
        strong: "6) Avoid Overwashing: ",
        text: "Wash hair every other day or as needed to prevent dryness.",
      },
      {
        strong: "7) Leave-In Conditioner: ",
        text: "Apply to damp hair for added moisture and protection.",
      },
      {
        strong: "8) Regular Trims: ",
        text: "Trim split ends for healthier-looking hair.",
      },
      {
        strong: "9) Deep Conditioning: ",
        text: "Use treatments or masks weekly for nourishment.",
      },
      {
        strong: "10) Avoid Tight Hairstyles: ",
        text: "Prevent damage and breakage by avoiding tight styles.",
      },
      {
        strong: "11) Limit Chemical Treatments: ",
        text: "Reduce frequency of harsh treatments like dyes and perms.",
      },
      {
        strong: "12) Use Hair Oils: ",
        text: "Apply natural oils like coconut or argan for shine and hydration.",
      },
    ],
  },
  "Frizzy Hair": {
    heading: "HAIR QUALITY",
    title: "Frizzy Hair",
    paragraphs: [
      {
        strong: "1) Moisturizing Products: ",
        text: "Use shampoos and conditioners designed for dry or frizzy hair to hydrate and reduce frizz.",
      },
      {
        strong: "2) Avoid Harsh Ingredients: ",
        text: "Stay away from sulfates and alcohol which strip natural oils, exacerbating frizz.",
      },
      {
        strong: "3) Wide-Tooth Comb: ",
        text: "Detangle gently with a wide-tooth comb while wet to prevent breakage and minimize frizz.",
      },
      {
        strong: "4) Pat Dry: ",
        text: "After washing, pat hair dry gently with a towel to prevent frizz and breakage.",
      },
      {
        strong: "5) Leave-In Conditioner: ",
        text: "Apply to damp hair for extra moisture and frizz protection, focusing on ends.",
      },
      {
        strong: "6) Limit Heat Styling: ",
        text: "Reduce use of heat tools to prevent damage and frizz; use a heat protectant if needed.",
      },
      {
        strong: "7) Air Dry: ",
        text: "Let hair air dry to reduce frizz and enhance natural texture.",
      },
      {
        strong: "8) Anti-Frizz Products: ",
        text: "Use creams, serums, or oils designed to combat frizz and smooth hair cuticles.",
      },
      {
        strong: "9) Regular Trims: ",
        text: "Prevent split ends with trims every 6 to 8 weeks.",
      },
      {
        strong: "10) Humidity Protection: ",
        text: "Use products or hairstyles that shield hair from humidity, like braids or updos.",
      },
      {
        strong: "11) Silk Pillowcase: ",
        text: "Sleep on silk or satin to minimize friction, reducing frizz and breakage.",
      },
      {
        strong: "12) Deep Conditioning: ",
        text: "Use treatments weekly for extra hydration and nourishment.",
      },
      {
        strong: "13) Limit Brushing: ",
        text: "Avoid over-brushing; use wide-tooth combs or detangling brushes as needed.",
      },
    ],
  },
  "Tangles Easily & Forms Knot": {
    heading: "HAIR QUALITY",
    title: "Tangles Easily & Forms Knot",
    paragraphs: [
      {
        strong: "",
        text: "Managing hair that tangles easily and forms knots can be challenging, but with the right techniques and products, you can minimize tangles and keep your hair more manageable. Here are some tips for managing tangled and knotted hair: ",
      },
      {
        strong: "1) Wide-Tooth Comb or Detangling Brush: ",
        text: "Gently remove tangles, starting from ends and working upwards.",
      },
      {
        strong: "2) Apply Conditioner Liberally; ",
        text: "Moisturize hair thoroughly, focusing on ends, to reduce tangles.",
      },
      {
        strong: "3) Detangle Wet Hair: ",
        text: "Do so after applying conditioner in the shower when hair is elastic and less prone to breakage.",
      },
      {
        strong: "4) Use Leave-In Conditioner or Detangling Spray: ",
        text: "Make combing easier and reduce tangles with leave-in products.",
      },
      {
        strong: "5) Avoid Overwashing: ",
        text: "Prevent dryness and tangles by washing hair every other day or as needed.",
      },
      {
        strong: "6) Protect Hair While Sleeping: ",
        text: "Use a loose braid or silk/satin pillowcase to minimize friction and knots.",
      },
      {
        strong: "7) Limit Heat Styling: ",
        text: "Heat tools can damage hair and increase tangling; use a heat protectant if necessary.",
      },
      {
        strong: "8) Trim Regularly: ",
        text: "Prevent split ends by trimming every 6 to 8 weeks.",
      },
      {
        strong: "9) Protect Hair During Activities: ",
        text: "Wear protective styles or swim caps during activities prone to tangling.",
      },
      {
        strong: "10) Avoid Harsh Chemical Treatments: ",
        text: "Minimize treatments like perms and bleach, which weaken hair.",
      },
      {
        strong: "11) Use Oils or Serums: ",
        text: "Add moisture and reduce friction with hair oils or serums on ends.",
      },
      {
        strong: "12) Be Gentle: ",
        text: "Handle wet hair delicately to avoid breakage; don't tug forcefully at knots.",
      },
      {
        strong: "",
        text: "Remember, patience is essential when dealing with tangled and knotted hair. Developing a consistent hair care routine with proper techniques and products can gradually improve the condition of your hair and reduce tangling. ",
      },
    ],
  },
  "Split Ends": {
    heading: "HAIR QUALITY",
    title: "Split Ends",
    paragraphs: [
      {
        strong: "",
        text: "Managing split ends in hair involves a combination of preventive measures and trimming techniques. While there's no way to repair split ends entirely, following these tips can help minimize their occurrence and improve the overall health of your hair: ",
      },
      {
        strong: "1) Regular Trims: ",
        text: "Trim hair every 6 to 8 weeks to remove split ends.",
      },
      {
        strong: "2) Sharp Scissors: ",
        text: "Use quality scissors to prevent further damage.",
      },
      {
        strong: "3) Reduce Heat Styling: ",
        text: "Minimize heat tools or use a protectant spray.",
      },
      {
        strong: "4) Avoid Harsh Chemicals: ",
        text: "Limit perms, relaxers, and bleaching.",
      },
      {
        strong: "5) Gentle Brushing: ",
        text: "Use wide-tooth combs and brush gently.",
      },
      {
        strong: "6) Leave-In Conditioner: ",
        text: "Keep hair moisturized to prevent splits.",
      },
      {
        strong: "7) Protective Wear: ",
        text: "Shield hair from sun, wind, and pollution.",
      },
      {
        strong: "8) Avoid Tight Styles: ",
        text: "Prevent stress on the hair shaft.",
      },
      {
        strong: "9) Deep Conditioning: ",
        text: "Hydrate hair weekly to prevent splits.",
      },
      {
        strong: "10) Use Protective Oils: ",
        text: "Apply natural oils to seal in moisture",
      },
      {
        strong: "11) Limit Chemical Treatments: ",
        text: "Reduce dye and harsh treatments. Remember, once split ends occur, trimming is the only solution. Regular care can help prevent them and keep hair healthy.",
      },
    ],
  },
  "Greasy Hair (Oily)": {
    heading: "HAIR QUALITY",
    title: "Greasy Hair (Oily)",
    paragraphs: [
      {
        strong: "",
        text: "Managing greasy or oily hair involves adopting a hair care routine that balances oil production on the scalp while keeping your hair clean and fresh. Here are some tips to manage greasy or oily hair: ",
      },
      {
        strong: "1) Clarifying Shampoo: ",
        text: "Use weekly to remove excess oil and buildup.",
      },
      {
        strong: "2) Regular Washing: ",
        text: "Keep hair clean, but avoid overwashing.",
      },
      {
        strong: "3) Choose Oil Control Products: ",
        text: "Opt for shampoos labeled for oily hair.",
      },
      {
        strong: "4) Avoid Heavy Products: ",
        text: "Steer clear of pomades and heavy serums.",
      },
      {
        strong: "5) Hands Off: ",
        text: "Minimize touching hair to reduce oil transfer.",
      },
      {
        strong: "6) Dry Shampoo: ",
        text: "Use sparingly between washes for a quick refresh.",
      },
      {
        strong: "7) Cool Water: ",
        text: "Wash with lukewarm water to prevent excess oil.",
      },
      {
        strong: "8) Limit Conditioner: ",
        text: "Apply mainly to ends to avoid over-conditioning.",
      },
      {
        strong: "9) Regular Brushing: ",
        text: "Distribute natural oils along the hair shaft.",
      },
      {
        strong: "10) Minimize Heat Styling: ",
        text: "Use heat protectant and low settings.",
      },
      {
        strong: "11) Hair Tie-Up: ",
        text: "Keep hair away from face to prevent oil transfer.",
      },
      {
        strong: "12) Healthy Diet: ",
        text: "Reduce greasy and fatty foods in your diet.",
      },
    ],
  },
  "Dry Hair": {
    heading: "HAIR QUALITY",
    title: "Dry Hair",
    paragraphs: [
      {
        strong: "",
        text: "Managing dry hair involves a combination of proper hair care practices and lifestyle changes to restore moisture and improve the overall health of your hair. Here are some tips to help manage dry hair: ",
      },
      {
        strong: "1) Moisturizing Products: ",
        text: "Opt for sulfate-free shampoo and conditioner designed for dry hair.",
      },
      {
        strong: "2) Limit Washing: ",
        text: "Avoid daily washing to retain natural oils; opt for every other day or a few times a week.",
      },
      {
        strong: "3) Use Lukewarm Water: ",
        text: "Prevent drying out by washing with lukewarm water.",
      },
      {
        strong: "4) Limit Heat Styling: ",
        text: "Minimize use of heat tools or apply heat protectant before styling.",
      },
      {
        strong: "5) Air Dry: ",
        text: "Allow hair to air dry to reduce heat damage and retain moisture.",
      },
      {
        strong: "6) Leave-In Conditioner: ",
        text: " Apply for added moisture, detangling, and frizz control.",
      },
      {
        strong: "7) Deep Conditioning: ",
        text: "Weekly treatments with nourishing ingredients provide intense hydration.",
      },
      {
        strong: "8) Sun Protection: ",
        text: "Wear a hat or use UV protection hair products to shield from sun damage.",
      },
      {
        strong: "9) Avoid Chemical Treatments: ",
        text: "Minimize or avoid treatments like dyes and perms that further dry hair.",
      },
      {
        strong: "10) Use Wide-Tooth Comb: ",
        text: "Minimize breakage by combing gently from ends to roots.",
      },
      {
        strong: "11) Regular Trims: ",
        text: "Prevent damage and split ends by trimming regularly.",
      },
      {
        strong: "12) Hydration and Diet: ",
        text: "Stay hydrated and maintain a balanced diet for overall hair health.",
      },
      {
        strong: "13) Hair Oils: ",
        text: "Lock in moisture and add shine with natural oils like coconut or argan. Consistency is key in managing dry hair. Stick to a healthy hair care routine for noticeable improvements over time.",
      },
    ],
  },
  "Brittle Hair": {
    heading: "HAIR QUALITY",
    title: "Brittle Hair",
    paragraphs: [
      {
        strong: "",
        text: "Managing brittle hair involves a combination of proper hair care practices and lifestyle changes to strengthen your hair and improve its overall health. Here are some tips to help manage brittle hair:",
      },
      {
        strong: "1) Gentle Products: ",
        text: "Opt for sulfate-free, moisturizing shampoos and conditioners tailored for brittle hair.",
      },
      {
        strong: "2) Limit Washing: ",
        text: "Reduce frequency to preserve natural oils; aim for every other day or a few times weekly.",
      },
      {
        strong: "3) Use Lukewarm Water: ",
        text: "Prevent stripping natural oils by washing with lukewarm water.",
      },
      {
        strong: "4) Target Conditioner: ",
        text: "Apply conditioner mainly to ends to avoid weighing down hair.",
      },
      {
        strong: "5) Leave-In Conditioner: ",
        text: "Add extra moisture and protection, especially for very brittle hair.",
      },
      {
        strong: "6) Deep Conditioning: ",
        text: "Use regular treatments with ingredients like keratin or coconut oil for hydration.",
      },
      {
        strong: "7) Limit Heat Styling: ",
        text: "Minimize use of heat tools; apply heat protectant and use lowest heat setting if necessary.",
      },
      {
        strong: "8) Protective Measures: ",
        text: "Shield hair from environmental damage with hats or protective hairstyles.",
      },
      {
        strong: "9) Avoid Tight Styles: ",
        text: "Prevent breakage and brittleness by avoiding tension-inducing hairstyles.",
      },
      {
        strong: "10) Regular Trims: ",
        text: "Trim routinely to remove split ends and prevent further damage.",
      },
      {
        strong: "11) Hydration and Nutrition: ",
        text: "Stay hydrated and maintain a balanced diet for hair health.",
      },
      {
        strong: "12) Hair Oils: ",
        text: "Seal in moisture and add shine with natural oils like coconut or argan.",
      },
      {
        strong: "13) Sleep Protection: ",
        text: "Minimize friction and breakage with satin or silk pillowcases or loose braids while sleeping. Consistency and patience are key in managing brittle hair. Stick to a healthy hair care routine for noticeable improvements over time.",
      },
    ],
  },
  Decreased: {
    heading: "HAIR DENSITY",
    title: "Decreased",
    paragraphs: [
      {
        strong: "",
        text: "Managing decreased hair density involves a combination of lifestyle changes, proper hair care, and, in some cases, medical intervention. Here are some tips to help manage decreased hair density: ",
      },
      {
        strong: "1) Seek Professional Advice: ",
        text: "Consult a dermatologist or healthcare provider to identify potential causes for decreased hair density, such as alopecia or hormonal imbalances.",
      },
      {
        strong: "2) Balanced Diet: ",
        text: "Ensure your diet includes essential nutrients like vitamins (A, C, D, E, B-complex), minerals (iron, zinc, selenium), and proteins to support healthy hair growth.",
      },
      {
        strong: "3) Stress Reduction: ",
        text: "Manage stress through practices like meditation or yoga to potentially improve hair density.",
      },
      {
        strong: "4) Avoid Traction Hairstyles: ",
        text: "Steer clear of hairstyles like tight braids or ponytails that can damage hair follicles and lead to hair loss.",
      },
      {
        strong: "5) Handle Hair with Care: ",
        text: "Be gentle when brushing, combing, or styling, particularly when hair is wet and more prone to breakage.",
      },
      {
        strong: "6) Limit Heat Styling: ",
        text: "Reduce use of heat tools like hair dryers and straighteners to prevent hair weakening and damage.",
      },
      {
        strong: "7) Use Gentle Products: ",
        text: "Opt for hair products without harsh chemicals or alcohol to avoid further hair and scalp damage.",
      },
      {
        strong: "8) Explore Hair Growth Treatments: ",
        text: "Consult a professional about over-the-counter or prescription treatments like minoxidil or finasteride to stimulate hair growth.",
      },
      {
        strong: "9) Scalp Massage: ",
        text: "Promote blood circulation and potential hair growth by gently massaging the scalp regularly.",
      },
      {
        strong: "10) Consider Laser Therapy: ",
        text: "Discuss low-level laser therapy (LLLT) options with a professional to stimulate hair growth.",
      },
      {
        strong: "11) Explore PRP Therapy: ",
        text: "Investigate Platelet-Rich Plasma (PRP) therapy under professional guidance for potential hair growth benefits.",
      },
      {
        strong: "12) Lifestyle Habits: ",
        text: "Avoid smoking and excessive alcohol consumption, which can negatively impact hair health and contribute to hair loss.",
      },
    ],
  },
  "Faded (Dull) Hair Color": {
    heading: "HAIR COLOR VIBRANCY",
    title: "Faded (Dull) Hair Color",
    paragraphs: [
      {
        strong: "",
        text: "If your hair color has faded or become dull, there are several management tips and tricks you can try to revive and maintain your color. Here are some suggestions: ",
      },
      {
        strong: "1) Color-Protecting Products: ",
        text: "Use shampoos and conditioners designed for color-treated hair to preserve color and prevent fading.",
      },
      {
        strong: "2) Wash Less Frequently: ",
        text: "Minimize washing to every other day or less to prevent stripping color and natural oils.",
      },
      {
        strong: "3) Cool Water Rinse: ",
        text: "Seal hair cuticles and enhance shine by rinsing with cool water during washing.",
      },
      {
        strong: "4) Limit Heat Styling: ",
        text: "Protect color from fading by using heat styling tools sparingly and with a heat protectant.",
      },
      {
        strong: "5) Sun Protection: ",
        text: "Shield hair from UV rays with hats or UV-protectant hair products during outdoor activities.",
      },
      {
        strong: "6) Chlorine and Saltwater: ",
        text: "Rinse hair thoroughly after swimming and consider leave-in conditioner to counteract chlorine and saltwater effects.",
      },
      {
        strong: "7) Color-Enhancing Products: ",
        text: "Maintain color intensity with shampoos, conditioners, and masks tailored to your hair color.",
      },
      {
        strong: "8) Gloss Treatments: ",
        text: "Enhance shine and vibrancy with salon gloss or glaze treatments.",
      },
      {
        strong: "9) Avoid Harsh Chemicals: ",
        text: "Minimize use of damaging chemicals like bleach and perms to prolong color life.",
      },
      {
        strong: "10) Deep Conditioning: ",
        text: "Keep hair hydrated and vibrant with regular deep conditioning treatments.",
      },
      {
        strong: "11) Alcohol-Free Products: ",
        text: "Opt for alcohol-free hair products to avoid drying out color-treated hair.",
      },
      {
        strong: "12) Regular Trims: ",
        text: "Trim hair regularly to prevent split ends and maintain overall hair health.",
      },
      {
        strong: "13) Color Refresh: ",
        text: "Consider returning to the salon for color touch-ups if your hair color has significantly faded.",
      },
      {
        strong: "",
        text: "Remember that hair color fading is a natural process, especially with vibrant or semi-permanent dyes. By following these management tips and maintaining a healthy hair care routine, you can help extend the life of your color and keep it looking fresh and vibrant for longer. ",
      },
    ],
  },
  "Lack of Moisture": {
    heading: "HAIR MOISTURE",
    title: "Lack of Moisture",
    paragraphs: [
      {
        strong: "",
        text: "Managing hair that lacks moisture involves a combination of proper hair care practices and lifestyle changes to hydrate and nourish your hair. Here are some tips to help manage hair with a lack of moisture:",
      },
      {
        strong: "1) Moisturizing Haircare: ",
        text: "Opt for sulfate-free, moisturizing shampoos and conditioners designed for dry or damaged hair to retain moisture.",
      },
      {
        strong: "2) Washing Frequency: ",
        text: "Limit hair washing to every other day or a few times a week to prevent stripping natural oils and dryness.",
      },
      {
        strong: "3) Water Temperature: ",
        text: "Wash hair with lukewarm water to avoid further drying out the hair and scalp.",
      },
      {
        strong: "4) Proper Conditioning: ",
        text: "Apply conditioner primarily to the ends of hair to prevent weighing it down, avoiding the scalp.",
      },
      {
        strong: "5) Leave-In Conditioner: ",
        text: "For extra moisture and protection, use leave-in conditioners on damp hair, especially for dry hair types.",
      },
      {
        strong: "6) Deep Conditioning: ",
        text: "Regularly use deep conditioning treatments or hair masks with nourishing ingredients like shea butter, coconut oil, or argan oil.",
      },
      {
        strong: "7) Limit Heat Styling: ",
        text: "Reduce heat styling tool usage to prevent dryness and damage.",
      },
      {
        strong: "8) Sun Protection: ",
        text: "Shield hair from sun damage with hats or UV-protectant hair products during outdoor activities.",
      },
      {
        strong: "9) Avoid Harsh Chemicals: ",
        text: "Minimize or avoid chemical treatments like dyes, bleach, and perms to prevent further drying out hair.",
      },
      {
        strong: "10) Hair Oils: ",
        text: "Apply natural oils like coconut oil, argan oil, or jojoba oil to hair ends for moisture locking and added shine.",
      },
      {
        strong: "11) Hydration and Nutrition: ",
        text: "Maintain hair health with adequate hydration and a balanced diet rich in vitamins and minerals.",
      },
      {
        strong: "12) Limit Alcohol and Caffeine: ",
        text: "Reduce alcohol and caffeine intake to prevent dehydration, which can affect hair moisture levels.",
      },
      {
        strong: "",
        text: "Remember that managing dry hair may take time and consistency. Be patient and continue to follow a healthy hair care routine, and you should see improvements in the moisture and overall health of your hair over time. ",
      },
    ],
  },
  "Excessive Breakage": {
    heading: "HAIR BREAKAGE",
    title: "Excessive Breakage",
    paragraphs: [
      {
        strong: "",
        text: "Experiencing excessive hair breakage is worrying, but addressing it promptly can prevent further damage. Here's how to handle it: ",
      },
      {
        strong: "1) Identify the Cause: ",
        text: "Determine what's causing the breakage, whether it's heat styling, chemical treatments, or other factors. Consult a dermatologist or trichologist for accurate diagnosis.",
      },
      {
        strong: "2) Reduce Heat Styling: ",
        text: "Minimize use of heat tools like dryers and straighteners, and always use a heat protectant.",
      },
      {
        strong: "3) Avoid Over-processing: ",
        text: "Give your hair a break from harsh chemical treatments to allow it to recover.",
      },
      {
        strong: "4) Use Gentle Products: ",
        text: "Opt for sulfate-free shampoos and conditioners that provide hydration and nourishment.",
      },
      {
        strong: "5) Deep Condition Regularly: ",
        text: "Treat your hair to deep conditioning masks with ingredients like keratin and coconut oil.",
      },
      {
        strong: "6) Trim Split Ends: ",
        text: "Regular trims every 6 to 8 weeks can prevent further breakage.",
      },
      {
        strong: "7) Avoid Tight Hairstyles: ",
        text: "Opt for looser styles to reduce tension on your hair.",
      },
      {
        strong: "8) Protect Hair at Night: ",
        text: "Sleep on satin or silk pillowcases to minimize friction.",
      },
      {
        strong: "9) Maintain a Balanced Diet: ",
        text: "Ensure you're getting essential nutrients for healthy hair growth.",
      },
      {
        strong: "10) Stay Hydrated: ",
        text: "Drink plenty of water to keep your hair hydrated.",
      },
      {
        strong: "11) Manage Stress: ",
        text: "Practice stress-reducing techniques to promote overall well-being.",
      },
    ],
  },
};

export default function Page4({data}) {
//   const [selectedCondition, setSelectedCondition] = useState('oilyScalp');

  const renderContent = () => {
    const conditionContent = content[data];
    return (
      <div className='strong-highlight'>
        {conditionContent?.paragraphs?.map((paragraph, index) => (
          <p key={index}>
            <strong>{paragraph.strong}</strong>
            {paragraph.text}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className='a4-page avoid-break page-break-1'>
      <h1 className='hair-scalp-h1'>2) Hair & Scalp Treatment Recommendation</h1>
      <h1 style={{ textAlign: 'center' }}>Assessment of <span className='span-scalp'>{content[data]?.heading}</span></h1>
      <h1 className='hair-scalp-h1 block-h1'>{content[data]?.title}</h1>
      {renderContent()}
    
    </div>
  );
}
