import React, { useState, useEffect, useContext } from "react";
import Fuse from "fuse.js";
import { Card, Header, Player } from "../components";
import * as ROUTES from "../constants/routes";
import logo from "../logo.png";
import upload from "../upload.gif";
import { FirebaseContext } from "../context/firebase";

import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../lib/firebase.prod";

import { SelectProfileContainer } from "./profiles";
import { FooterContainer } from "./footer";

export function BrowseContainer({ slides }) {
  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};

  var [pdfUrls, setPdfUrls] = useState([]);
  const [resume, setResume] = useState(null);



  useEffect(() => {
    getDownloadURL(ref(storage, "Resume.pdf")).then((url) => {
      setResume(url);
    });
  }, []);


  const [category, setCategory] = useState("articles");
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [slideRows, setSlideRows] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [profile.displayName]);

  useEffect(() => {
    setSlideRows(slides[category]);
  }, [slides, category]);

  useEffect(() => {
    const fuse = new Fuse(slideRows, {
      keys: [
        "data.description",
        "data.title",
        "data.genre",
        "data.category",
        "data.author",
      ],
    });
    const results = fuse.search(searchTerm).map(({ item }) => item);

    if (slideRows.length > 0 && searchTerm.length > 0 && results.length > 0) {
      setSlideRows(results);
    } else {
      setSlideRows(slides[category]);
    }
  }, [searchTerm]);

  return profile.displayName ? (
    <>
      <Header src="dsa-cover" dontShowOnSmallViewPort>
        <Header.Frame>
          <Header.Group>
            <Header.Logo to={ROUTES.BROWSE} src={logo} alt="Bookflix" />
            <Header.TextLink
              active={category === "articles" ? "true" : "false"}
              onClick={() => setCategory("articles")}
            >
              Articles
            </Header.TextLink>
            <Header.TextLink
              active={category === "books" ? "true" : "false"}
              onClick={() => setCategory("books")}
            >
              Books
            </Header.TextLink>
          </Header.Group>
          <Header.Group>
            <Header.Upload
              to={ROUTES.UPLOAD}
              src={upload}
              alt="upload"
              title="upload"
            />
          </Header.Group>

          <Header.Group>
            <Header.Search
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            <Header.Profile>
              <Header.Picture src={user.photoURL} />
              <Header.Dropdown>
                <Header.Group>
                  <Header.Picture src={user.photoURL} />
                  <Header.TextLink>{user.displayName}</Header.TextLink>
                </Header.Group>
                <Header.Group>
                  <Header.TextLink onClick={() => firebase.auth().signOut()}>
                    Sign out
                  </Header.TextLink>
                </Header.Group>
              </Header.Dropdown>
            </Header.Profile>
          </Header.Group>
        </Header.Frame>

        <Header.Feature>
          <Header.FeatureCallOut>Read DSA Now</Header.FeatureCallOut>
          <Header.Text>
            Data structures and algorithms (DSA) goes through solutions to
            standard problems in detail and gives you an insight into how
            efficient it is to use each one of them. It also teaches you the
            science of evaluating the efficiency of an algorithm. This enables
            you to choose the best of various choices.
          </Header.Text>
          <Player>
            <Player.Button />
            <Player.Video src={resume} />
          </Player>{" "}
        </Header.Feature>
      </Header>

      <Card.Group>
        {slideRows.map((slideItem) => (
          <Card
            key={`${category}-${slideItem.title.toLowerCase()}`}
            autoCollapse="true"
          >
            <Card.Title>{slideItem.title}</Card.Title>
            <Card.Entities>
              {slideItem.data.map((item) => (
                <Card.Item key={item.docId} item={item}>
                  <Card.Meta>
                    <Card.SubTitle>{item.title}</Card.SubTitle>
                    <br />
                    <br />
                  </Card.Meta>
                  <Card.Image src={item.image} alt={item.title} />
                </Card.Item>
              ))}
            </Card.Entities>
            <Card.Feature category={category}>
              <Player>
                <Player.Button />
                <Player.Video src={resume} />
              </Player>
            </Card.Feature>
          </Card>
        ))}
      </Card.Group>
      <FooterContainer />
    </>
  ) : (
    <SelectProfileContainer user={user} setProfile={setProfile} />
  );
}
