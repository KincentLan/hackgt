import React, {useEffect, useState} from "react";
import app from "../../base";
import firebase from 'firebase/app';
import 'firebase/auth';
import '../../css/home.css';
import '../../css/navbar.css'
import 'firebase/firestore';
import 'firebase/firestore';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {PDFDownloadLink, Document, Page, Text, View, Font} from '@react-pdf/renderer';
import styled from '@react-pdf/styled-components';

const firestore = firebase.firestore();

const Home = () => {
    return (<div className="main">
        <div className="navbar">
            <div className="left-title">Dashboard</div>
            <div className="dropdown">
                <button className="dropbtn"> OnlyFans</button>
                <div className="dropdown-content">
                    <a href="#">
                        <button id="homeButton" onClick={() => app.auth().signOut()}>Sign out</button>
                    </a>
                </div>
            </div>
        </div>
        <div className="row">
            <div id="left">
                <h1>Prof's notes</h1>
                <ProfNotes/>
            </div>
            <div id="right">
                <h1>Everyone’s Answers</h1>
                <StudentNotes/>
            </div>
        </div>
         <PDFDownloadLink document={<MyDocument/>} fileName="classnotes.pdf">
            {({blob, url, loading, error}) => (loading ? 'Loading document...' : 'Download now!')}
        </PDFDownloadLink>
    </div>);
}

const StudentNotes = () => {
    const messagesRef = firestore.collection('messages');

    const query = messagesRef.orderBy('createdTimestamp');
    const [messages] = useCollectionData(query, {idField: 'id'});
    console.log(messages);
    const [formValue, setFormValue] = useState('');
    const [questionNo, setQuestionNo] = useState('');


    const sendMessage = async (e) => {
        e.preventDefault();

        await messagesRef.add({
            message: formValue,
            createdTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
            name: "Student John",
            type: "student",
            questionNo: questionNo
        })

        setFormValue('');
        setQuestionNo('');
    }

    return (<>
        <main className="message-box">
            {messages && messages.filter(data => data['type'] === "student").map(msg =>
                <ChatMessage name={msg.name} message={msg.message} questionNo={msg.questionNo}/>)}
        </main>

        <form class="typeInput" onSubmit={sendMessage}>
            <input value={formValue} onChange={(e) => setFormValue(e.target.value)}
                   placeholder="ask your question here"/>
            <input value={questionNo} onChange={(e) => setQuestionNo(e.target.value)}
                   placeholder="question number"/>
            <button type="submit" disabled={!formValue || !questionNo}>🕊️</button>
        </form>
    </>)
}

const ProfNotes = () => {
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdTimestamp');
    const [messages] = useCollectionData(query, {idField: 'id'});
    const [formValue, setFormValue] = useState('');
    const [questionNo, setQuestionNo] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();

        await messagesRef.add({
            message: formValue,
            createdTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
            name: "Prof Jinay",
            type: "teacher",
            questionNo: questionNo
        })

        setFormValue('');
        setQuestionNo('');
    }

    return (<>
        <main className="message-box">
            {messages && messages.filter(data => data['type'] === "teacher").map(msg =>
                <ChatMessage name={msg.name} message={msg.message} questionNo={msg.questionNo}/>)}
        </main>

        <form class="typeInput" onSubmit={sendMessage}>
            <input value={formValue} onChange={(e) => setFormValue(e.target.value)}
                   placeholder="ask your question here"/>
            <input value={questionNo} onChange={(e) => setQuestionNo(e.target.value)}
                   placeholder="question number"/>
            <button type="submit" disabled={!formValue || !questionNo}>🕊️</button>
        </form>
    </>)
}

function ChatMessage(props) {
    const text = props.message;
    const name = props.name;
    const questionNo = props.questionNo;

    return (<div>
        <div className="message">
            <h3>Question No: {questionNo} </h3>
            <p>{name}: {text}</p>
        </div>
    </div>)
}

const Body = styled.Page`
  padding-top: 35px;
  padding-bottom: 65px;
  padding-right: 35px;
  padding-left: 35px;
`;

const Header = styled.Text`
  color: grey;
  font-size: 12px;
  text-align: center;
  margin-bottom: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  text-align: center;
  font-family: 'Oswald';
`;

const Subtitle = styled.Text`
  margin: 12px;
  font-size: 18px;
  font-family: 'Oswald';
`;

const Author = styled.Text`
  font-size: 12px;
  text-align: center;
  margin-bottom: 40px;
`;

const Paragraph = styled.Text`
  margin: 12px;
  font-size: 14px;
  text-align: justify;
  font-family: 'Times-Roman';
`;

const Picture = styled.Image`
  margin: 15px 100px;
`;

const Footer = styled.Text`
  left: 0px;
  right: 0px;
  color: grey;
  bottom: 30px;
  font-size: 12px;
  position: absolute;
  text-align: center;
`;

Font.register(
    'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
    {family: 'Oswald'},
);


// Create Document Component
const MyDocument = () => {
    return (
        <Document>
            <Body wrap>
                <Header fixed>
                    Created by OnlyFans
                </Header>
                <Title>Today's Classnotes</Title>
                <Subtitle>1. Did you play Undertale?</Subtitle>
                <Footer render={({pageNumber, totalPages}) => (
                    `${pageNumber} / ${totalPages}`
                )} fixed/>
            </Body>
        </Document>)
};

export default Home;