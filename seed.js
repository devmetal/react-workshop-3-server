const mongoose = require('mongoose');

const Project = mongoose.model('project');
const Employee = mongoose.model('employee');
const Technology = mongoose.model('technology');

const seed = () => {
  const p1 = new Project({ name: 'MeetupFeed' });
  const p2 = new Project({ name: 'Madbro' });
  const p3 = new Project({ name: 'CleanUp' });

  const e1 = new Employee({ name: 'Fruzsi' });
  const e2 = new Employee({ name: 'Lacka' });
  const e3 = new Employee({ name: 'Metál' });

  const t1 = new Technology({ name: 'Meteor', logo: 'https://forums.meteor.com/uploads/default/11/76194be3585631a9.png' });
  const t2 = new Technology({ name: 'Angular', logo: 'https://angular.io/assets/images/logos/angular/angular.png' });
  const t3 = new Technology({ name: 'React', logo: 'https://www.gitbook.com/cover/book/mongkuen/react.jpg?build=1470682429235' });
  const t5 = new Technology({ name: 'AngularJS', logo: 'https://angular.io/assets/images/logos/angularjs/AngularJS-Shield.svg' });
  const t6 = new Technology({ name: 'TypeScript', logo: 'https://camo.githubusercontent.com/364fcc20318b28180fbea3e335792e45caf3d4b2/687474703a2f2f7777772e747970657363726970746c616e672e6f72672f6173736574732f696d616765732f69636f6e732f616e64726f69642d6368726f6d652d313932783139322e706e67' });
  const t7 = new Technology({ name: 'NodeJs', logo: 'http://www.hexacta.com/wp-content/uploads/2015/12/node.png' });

  return Promise.all([
    p1.save(),
    p2.save(),
    p3.save(),
  ])
    .then(() => Promise.all([
      e1.save(),
      e2.save(),
      e3.save(),
    ]))
    .then(() => Promise.all([
      t1.save(),
      t2.save(),
      t3.save(),
      t5.save(),
      t6.save(),
      t7.save(),
    ]))
    .then(() => Promise.all([
      p1.addRequirements(t1, t2, t7),
      p2.addRequirements(t3, t6, t7),
      p3.addRequirements(t5, t7, t6),
    ]))
    .then(() => Promise.all([
      p1.addEmployees(e2, e3),
      p2.addEmployees(e1, e2, e3),
      p3.addEmployees(e1),
    ]))
    .then(() => Promise.all([
      e1.addTechnologies(t1, t2, t3, t6, t7),
      e2.addTechnologies(t2, t7, t3, t5, t7),
      e3.addTechnologies(t3, t7, t1, t6, t5),
    ]));
};

module.exports = () =>
  Project.count().then((count) => {
    if (!count) {
      return seed();
    }
    return Promise.resolve();
  });
