import React, { Component } from "react";
import SaveBtn from "../components/Savebutton";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import axios from "axios";

class Books extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    synopsis: "",
    googleAllBooks: []
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    axios.get("https://www.googleapis.com/books/v1/volumes?q=" + this.state.title)
      .then(res => {
        this.setState({ googleAllBooks: res.data.items, title: "" })
      }
      )
      .catch((err) => {
        console.log(err)
      });

  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Book Are You Looking For?</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />

              <FormBtn
                /* disabled={!(this.state.author && this.state.title)} */
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Search Results</h1>
            </Jumbotron>
            {this.state.googleAllBooks.length ? (
              <List>

                {this.state.googleAllBooks.map(googleBook => (
                  <ListItem >
                    <Link to={"/books/" + googleBook.id}>
                      <strong>
                        {googleBook.volumeInfo.title} by
                      </strong>
                    </Link>
                    <SaveBtn onClick={() => this.saveBook(this.googleBook.id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
