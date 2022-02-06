const { faker } = require('@faker-js/faker');
const createFakeUser=()=>({userid:null,'name':faker.name.firstName()});
const createFakeFriend=(param1,param2)=>({userid:param1,friendid:param2});

const friendsData=[];
const fakeUsers=[];
const desiredFakeUsers=10;
for(let i=0;i<desiredFakeUsers;i++){
  fakeUsers.push(createFakeUser());
}

function pluck(array, key) {
  return array.map(function(obj) {
    return obj[key];
  });
}
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  knex('friends').truncate();
  
  
  return knex('users').del()
    .then(async function () {
      
      await knex.raw('ALTER TABLE ' + 'users' + ' AUTO_INCREMENT = 1');
      await knex('users').insert(fakeUsers);

      const Fakeusers= await knex('users').select('userid','name');
      const FakeUserId=pluck( Fakeusers,'userid');
      console.log("random users generated with random friends");
      for(let i=0;i<10;i++){
        let user_id=faker.random.arrayElement(FakeUserId);
        let friend_id=faker.random.arrayElement(FakeUserId);
        while(user_id==friend_id){
           friend_id=faker.random.arrayElement(FakeUserId);
        }
        friendsData.push(createFakeFriend(user_id,friend_id));
      }
      await knex('friends').insert(friendsData);
      // const Fakeusers= await knex('users').select('userid','name');
      // const FakeUserId=await knex('users').pluck('userid')
      // .then(ids => {
      //   for(let i=0;i<10;i++){
      //     let user_id=faker.random.arrayElement(ids);
      //     let friend_id=faker.random.arrayElement(ids);
      //     while(user_id==friend_id){
      //        friend_id=faker.random.arrayElement(ids);
      //     }
      //     friendsData.push(createFakeFriend(user_id,friend_id));
      //   }
      //  await knex('friends').insert(friendsData);
      // });
      // Inserts seed entries
      return ;
    });
};
