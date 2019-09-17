const { Project } = require('./models');
const { data } = require('./data');

const genProjects = async () => {
  try {
    const projects = await Project.bulkCreate(data);
    console.log(`${projects.length} projects created`);
  } catch (e) {
    console.log('oopsie: ', e);
  }
};

const main = async () => {
  await Project.destroy({
    where: {},
  });
  await genProjects();
  process.exit();
};


main();
