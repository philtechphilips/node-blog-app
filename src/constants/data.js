import img1 from '../assets/pic1.jpg'
import img2 from '../assets/pic2.jpg'
import img3 from '../assets/pic3.jpg'
import img4 from '../assets/pic4.png'

export const blog = [
    {
        image: img1,
        topic: 'How to get a remote job as a programmer',
        body: 'What’s the best way to find programmer remote jobs Programmers are some of the most in-demand candidates the top remote companies are hiring. There are thousands of ads for front-end programmers, back-end programmers, full-stack programmers, remote contract programming jobs, and more.So finding remote jobs in programming isn’t the challenge. What you really need to learn is how to find and land a remote programmer job you actually love.'
    },
    {
        image: img2,
        topic: 'How to get a remote job as a programmer',
        body: 'What’s the best way to find programmer remote jobs Programmers are some of the most in-demand candidates the top remote companies are hiring. There are thousands of ads for front-end programmers, back-end programmers, full-stack programmers, remote contract programming jobs, and more.So finding remote jobs in programming isn’t the challenge. What you really need to learn is how to find and land a remote programmer job you actually love.'
    },
    {
        image: img3,
        topic: 'How to get a remote job as a programmer',
        body: 'What’s the best way to find programmer remote jobs Programmers are some of the most in-demand candidates the top remote companies are hiring. There are thousands of ads for front-end programmers, back-end programmers, full-stack programmers, remote contract programming jobs, and more.So finding remote jobs in programming isn’t the challenge. What you really need to learn is how to find and land a remote programmer job you actually love.'
    },
    {
        image: img4,
        topic: 'How to get a remote job as a programmer',
        body: 'What’s the best way to find programmer remote jobs Programmers are some of the most in-demand candidates the top remote companies are hiring. There are thousands of ads for front-end programmers, back-end programmers, full-stack programmers, remote contract programming jobs, and more.So finding remote jobs in programming isn’t the challenge. What you really need to learn is how to find and land a remote programmer job you actually love.'
    }
]

export const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
  
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return interval + ' years ago';
    }
  
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + ' months ago';
    }
  
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + ' days ago';
    }
  
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + ' hours ago';
    }
  
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + ' minutes ago';
    }
  
    if(seconds < 10) return 'just now';
  
    return Math.floor(seconds) + ' seconds ago';
  };
  