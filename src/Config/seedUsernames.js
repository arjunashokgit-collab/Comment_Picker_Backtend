const Username = require('../Models/Username');

const sampleUsernames = [
  'john_doe', 'emma_wilson', 'alex_99', 'sophia_lee', 'michael_j',
  'david_smith', 'lisa_jones', 'james_brown', 'robert_miller', 'mary_davis',
  'patricia_garcia', 'elizabeth_rodriguez', 'linda_martinez', 'barbara_hernandez', 'susan_lopez',
  'jessica_gonzalez', 'sarah_wilson', 'karen_anderson', 'nancy_thomas', 'lisa_taylor',
  'betty_moore', 'margaret_jackson', 'sandra_martin', 'ashley_lee', 'kimberly_perez',
  'emily_thompson', 'donna_white', 'michelle_harris', 'carol_sanchez', 'amanda_clark',
  'dorothy_ramirez', 'melissa_lewis', 'deborah_robinson', 'stephanie_walker', 'rebecca_young',
  'sharon_allen', 'laura_king', 'cynthia_wright', 'kathleen_scott', 'amy_torres',
  'shirley_nguyen', 'angela_hill', 'helen_flores', 'anna_green', 'brenda_adams',
  'pamela_nelson', 'nicole_baker', 'samantha_hall', 'katherine_rivera', 'christine_campbell',
  'debra_mitchell', 'rachel_carter', 'carolyn_roberts', 'janet_gomez', 'maria_phillips',
  'heather_evans', 'diane_turner', 'virginia_diaz', 'kathleen_parker', 'julie_cruz',
  'joyce_edwards', 'victoria_collins', 'olivia_reyes', 'lauren_stewart', 'kelly_morris',
  'christina_morales', 'ruth_murphy', 'joan_cook', 'virginia_rogers', 'judith_gutierrez',
  'evelyn_ortiz', 'megan_morgan', 'cheryl_cooper', 'andrea_peterson', 'cleo_bailey',
  'marina_reed', 'clara_kelly', 'lydia_howard', 'teresa_ramos', 'jacqueline_cox',
  'sara_ward', 'gloria_richardson', 'harriet_watson', 'diana_brooks', 'ann_chavez',
  'alice_wood', 'jean_james', 'doris_bennett', 'julia_gray', 'marie_mendoza',
  'rose_ruiz', 'nicole_hughes', 'theresa_price', 'judy_alvarez', 'grace_castillo',
  'beverly_sanders', 'denise_patel', 'marilyn_myers', 'amber_long', 'danielle_ross',
  'rose_foster', 'jack_hopkins', 'tim_jenkins', 'brian_owens', 'kevin_barnes',
  'jerry_fisher', 'leonard_wilcox', 'douglas_patterson', 'steven_marshall', 'edward_ryder',
  'walter_saunders', 'peter_shaw', 'harold_wells', 'albert_griffin', 'philip_boyd',
  'arthur_ford', 'ryan_hamilton', 'roger_graham', 'joe_sullivan', 'juan_gonzales'
];

const seedUsernames = async () => {
  try {
    const count = await Username.countDocuments();
    if (count === 0) {
      console.log('[seedUsernames] Username collection is empty. Seeding sample usernames...');
      
      const documents = sampleUsernames.map(username => ({ username }));
      await Username.insertMany(documents);
      
      console.log(`[seedUsernames] Successfully seeded ${documents.length} sample usernames!`);
    } else {
      console.log(`[seedUsernames] Username collection already has ${count} records. Skipping seed.`);
    }
  } catch (error) {
    console.error('[seedUsernames] Error seeding usernames:', error.message);
  }
};

module.exports = seedUsernames;
