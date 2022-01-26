import { dbService, storageService } from "fbase";
import { useEffect, useState } from "react";
import Tweet from "components/Tweet";
import { v4 as uuidv4 } from "uuid";

const Home = ({ userObj }) => {
  // console.log(userObj);
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [attachment, setAttachment] = useState("");

  // const getTweets = async () => {
  // const dbTweets = await dbService.collection("tweets").get();
  // console.log(dbTweets);
  // dbTweets.forEach((document) => {
  // const tweetObject = { ...document.data(), id: document.id };
  // setTweets((prev) => [/*document.data()*/ tweetObject, ...prev]);
  // });
  // };

  useEffect(() => {
    // getTweets();

    dbService.collection("tweets").onSnapshot((snapshot) => {
      const newArray = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setTweets(newArray);
    });
  }, []);

  // console.log(tweets);

  const onSubmit = async (event) => {
    event.preventDefault();
    /*await dbService.collection("tweets").add({
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setTweet("");*/
    const attachmentRef = storageService
      .ref()
      .child(`${userObj.uid}/${uuidv4()}`);
    const response = await attachmentRef.putString(attachment, "data_url");
    console.log(response);
  };

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setTweet(value);
  };

  const onFileChange = (event) => {
    // console.log(event.target.files);

    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      // console.log(finishedEvent);
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => setAttachment("");

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={tweet}
          onChange={onChange}
          type='text'
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type='file' accept='image/*' onChange={onFileChange} />
        <input type='submit' value='Tweet' />
        {attachment && (
          <div>
            <img src={attachment} width='50px' height='50px' alt='profile' />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {tweets.map((tweet) => (
          // <div key={tweet.id}>
          //   <h4>{tweet.text}</h4>
          // </div>
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
