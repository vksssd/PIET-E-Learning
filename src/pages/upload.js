import React, { useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { storage, firebase } from "../lib/firebase.prod";
import { Form, Header } from "../components";
import * as ROUTES from "../constants/routes";
import logo from "../logo.png";
import Popup from "reactjs-popup";

export default function Upload() {
  
  const [imageUpload, setImageUpload] = useState(null);
  const [pdfUpload, setPdfUpload] = useState(null);
  const [imageName, setImageName] = useState("");
  const [imageDesc, setImageDesc] = useState("");
  var [imageUrl, setImageUrl] = useState("");
  var [pdfUrl, setPdfUrl] = useState("");
  const [pdfName, setPdfDesc] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [category, setCategory] = useState("");
  const [genre, setGenre] = useState("");

  const [showBooks, setShowBooks] = useState(false);
  const [showArticles, setShowArticles] = useState(false);

  function toggle(show) {
    return show ? false : true;
  }

  const isInvalid = imageName === "" || imageDesc === "";

  const [error, setError] = useState("");

  function getUUID() {
    // eslint gets funny about bitwise
    /* eslint-disable */
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const piece = (Math.random() * 16) | 0;
      const elem = c === "x" ? piece : (piece & 0x3) | 0x8;
      return elem.toString(16);
    });
    /* eslint-enable */
  }

  const ID = getUUID();

  const uploadFile = (event) => {
    event.preventDefault();
    console.log("uploading file...");
    if (imageUpload == null) return;
    else if (pdfUpload == null) return;
    setImageUrl("getting Url...");
    setPdfUrl("geting Url...");
    const imageRef = ref(storage, `images/${ID}`);

    uploadBytes(imageRef, imageUpload).then(() => {
      storage
        .ref("images")
        .child(ID)
        .getDownloadURL()
        .then( (url) => {
          setImageUrl(url);
        });
    });

    const imageDescr = ref(storage, `pdf/${ID}`);
     uploadBytes(imageDescr, pdfUpload).then(() => {
      storage
        .ref("pdf")
        .child(ID)
        .getDownloadURL()
        .then((url) => {
           setPdfUrl(url);
        });
    });
   
    firebase
      .firestore()
      .collection(`${category}`)
      .add({
        description: `${imageDesc}`,
        id: ID,
        title: `${imageName}`,
        author: `${authorName}`,
        genre: `${genre}`,
        maturity: "U",
        slug: `${imageDesc}`,
        image: imageUrl,
        pdf: pdfUrl,
      })

  };

  return (
    <>
      <Header src="dsa-cover" dontShowOnSmallViewPort>
        <Header.Frame>
          <Header.Logo to={ROUTES.BROWSE} src={logo} alt="Bookflix" />
        </Header.Frame>
        <Form>
          <Form.Title>Upload</Form.Title>
          {error && <Form.Error>{error}</Form.Error>}

          <Form.Base onSubmit={uploadFile} method="POST">
            <Form.Input
              placeholder="File name"
              value={imageName}
              onChange={({ target }) => setImageName(target.value)}
            />

            <Form.Input
              type="text"
              placeholder="Dscription"
              value={imageDesc}
              onChange={({ target }) => setImageDesc(target.value)}
            />
            <Form.Input
              type="text"
              placeholder="Author Name"
              value={authorName}
              onChange={({ target }) => setAuthorName(target.value)}
            />
            <Form.Text htmlFor="image_uploads">
              Choose images to upload (PNG, JPG, JPEG)
            </Form.Text>
            <Form.Input
              id="image_uploads"
              name="image_uploads"
              type="file"
              accept="image/*"
              onChange={(event) => {
                setImageUpload(event.target.files[0]);
              }}
            />
            <Form.Text htmlFor="PDF_uploads">
              Choose DOCUMENT to upload ( PDF )
            </Form.Text>
            <Form.Input
              type="file"
              id="PDF_uploads"
              name="PDF_uploads"
              accept=".pdf"
              value={pdfName}
              onChange={(event) => {
                setPdfUpload(event.target.files[0]);
              }}
            />

            <Header.Group>
              <Header.TextLink
                active={category === "articles" ? "true" : "false"}
                onClick={() => {
                  setCategory("articles");
                  setShowArticles(true);
                  setShowBooks(false);
                }}
              >
                Articles
              </Header.TextLink>

              <Header.TextLink
                active={category === "books" ? "true" : "false"}
                onClick={() => {
                  setCategory("books");
                  setShowBooks(true);
                  setShowArticles(false);
                }}
              >
                Books
              </Header.TextLink>
            </Header.Group>
            <Header.Group>
              {showArticles ? (
                <Header.Group>
                  <Header.TextLink
                    active={genre === "Subject Notes" ? "true" : "false"}
                    onClick={() => {
                      setGenre("Subject Notes");
                    }}
                  >
                    Subject Notes
                  </Header.TextLink>
                  <Header.TextLink
                    active={genre === "HandWritten" ? "true" : "false"}
                    onClick={() => {
                      setGenre("HandWritten");
                    }}
                  >
                    HandWritten
                  </Header.TextLink>
                  <Header.TextLink
                    active={genre === "Gate/PSUs" ? "true" : "false"}
                    onClick={() => {
                      setGenre("Gate/PSUs");
                    }}
                  >
                    Gate/PSUs
                  </Header.TextLink>
                  <Header.TextLink
                    active={genre === "University" ? "true" : "false"}
                    onClick={() => {
                      setGenre("University");
                    }}
                  >
                    University
                  </Header.TextLink>
                  <Header.TextLink
                    active={genre === "New Tech" ? "true" : "false"}
                    onClick={() => {
                      setGenre("New Tech");
                    }}
                  >
                    New Tech
                  </Header.TextLink>
                </Header.Group>
              ) : null}
            </Header.Group>
            <Header.Group>
              {showBooks ? (
                <Header.Group>
                  <Header.TextLink
                    active={genre === "Algorithms" ? "true" : "false"}
                    onClick={() => {
                      setGenre("Algorithms");
                    }}
                  >
                    Algorithms
                  </Header.TextLink>
                  <Header.TextLink
                    active={genre === "Programming for Beginner" ? "true" : "false"}
                    onClick={() => {
                      setGenre("Programming for Beginner");
                    }}
                  >
                    Programming for Beginner
                  </Header.TextLink>
                  <Header.TextLink
                    active={genre === "First Head Programming" ? "true" : "false"}
                    onClick={() => {
                      setGenre("First Head Programming");
                    }}
                  >
                    First Head Programming
                  </Header.TextLink>
                  <Header.TextLink
                    active={genre === "University" ? "true" : "false"}
                    onClick={() => {
                      setGenre("University");
                    }}
                  >
                    University
                  </Header.TextLink>
                  <Header.TextLink
                    active={genre === "New Tech" ? "true" : "false"}
                    onClick={() => {
                      setGenre("New Tech");
                    }}
                  >
                    New Tech
                  </Header.TextLink>
                </Header.Group>
              ) : null}
            </Header.Group>
            <Form.Submit
              disabled={isInvalid}
              type="submit"
              data-testid="upload"
            >
              Upload
            </Form.Submit>
          </Form.Base>
        </Form>
      </Header>
    </>
  );
}
