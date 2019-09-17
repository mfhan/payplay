const { Artist  } = require('./models');
const data = require('./data');

const seed = async () => {
  try {
    const artists = await Artist.bulkCreate(data);
    console.log(`${artists.length} artists created!`);
  } catch (e) {
    console.log(e.message);
  } finally {
    process.exit();
  }
};

seed();



// const { Artist, Sponsor } = require('./models');

// const seed = async () => {
//   try {
//     const artist1 = await Artist.create({ username: 'Lorraine' });
//     const artist2 = await Artist.create({ username: 'Cosette' });
//     const artist3 = await Artist.create({ username: 'FiddlerRoof' });
//
//     const sponsor1 = await Sponsor.create({ username: 'jeffbezos' });
//     const sponsor2 = await Sponsor.create({ username: 'christina' });
//     const sponsor3 = await Sponsor.create({ username: 'artlover' });
//     const sponsor4 = await Sponsor.create({ username: 'moneybags' });
//
//     // await artist1.setSponsors([sponsor1, sponsor2]);
//     // await artist2.setSponsors([sponsor1, sponsor4]);
//     // await artist3.setSponsors([sponsor1, sponsor2, sponsor3]);
//
//   } catch (e) {
//     console.log(e.message);
//   } finally {
//     process.exit();
//   }
// }
