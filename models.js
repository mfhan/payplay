const Sequelize  = require('sequelize');

const db = new Sequelize(
  (process.env.DATABASE_URL || 'postgres://localhost:5432/payplay_db'),
  {
  database: 'payplay_db',
  dialect: 'postgresql',
  define: { underscored: true }
});

class Artist extends Sequelize.Model {}
Artist.init({
  username: Sequelize.STRING,
  password_digest: Sequelize.STRING,
	zipcode: Sequelize.INTEGER,
  lat: {
    type: Sequelize.FLOAT,
    allowNull: true,
    defaultValue: 40.753345,
    validate: { min: -90, max: 90 }
  },
  long: {
    type: Sequelize.FLOAT,
    allowNull: true,
    defaultValue: -73.982759,
    validate: { min: -180, max: 180 }
  },
	email: Sequelize.STRING,
  intro: Sequelize.TEXT,
	social1: Sequelize.STRING,
  social2: Sequelize.STRING,
  social3: Sequelize.STRING,
  genre1: Sequelize.STRING,
  genre2: Sequelize.STRING,
  imagelink: Sequelize.TEXT
}, {
  sequelize: db,
  modelName: 'artist'
});


class Sponsor extends Sequelize.Model {}
Sponsor.init({
  username: Sequelize.STRING,
  password_digest: Sequelize.STRING,
	zipcode: Sequelize.INTEGER,
	email: Sequelize.STRING,
	favorites: Sequelize.TEXT
}, {
  sequelize: db,
  modelName: 'sponsor'
});

Artist.belongsToMany(Sponsor, { through: 'artist_sponsors' });
Sponsor.belongsToMany(Artist, { through: 'artist_sponsors' });

module.exports = {
  Artist, Sponsor, db
}
