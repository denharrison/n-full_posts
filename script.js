let getFullPosts = async (n) => {

    try {
      let posts = [];

      for (let i = 1; i <= n; i++) {
        let response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${i}`
        );
        let post = await response.json();
        posts.push(post);
      }

     for (let post of posts) {

       await getComment(post); 
       await getUsers(post); 
     }

      return posts;

    } catch (error) {
        
        console.error('Что-то пошло не так')

    }

}


let getComment = async (post) => {
  let response = await fetch(`https://jsonplaceholder.typicode.com/comments/`);
  let comments = await response.json();

  post.comments = comments.filter(
    (comment) => post.userId === comment.postId
  );

};

let getUsers = async (post) => {

  let response = await fetch(`https://jsonplaceholder.typicode.com/users/`);
  let users = await response.json();

  post.users = [];
  let postComments = post.comments

  users.forEach((user) => {

    if (postComments.some(comment => comment.id === user.id)) {
      post.users.push(user);
    }

  });

};


getFullPosts(10).then((result) => console.log(result));