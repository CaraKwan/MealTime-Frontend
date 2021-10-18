import {Layout, Typography} from "antd";
import {useState} from "react";
import LoginForm from "./components/LoginForm";
import FoodList from "./components/FoodList";
import MyCart from "./components/MyCart";
import SignupForm from "./components/SignupForm";


//Components that ant design provides
const {Header, Content} = Layout;
const {Title} = Typography;

function App() {
    //Login status， used to decide which component to display
    const [authed, setAuthed] = useState(false);

    return (
        <Layout style={{height: "100vh"}}>
            <Header>
                <div className="header" style={{display: "flex", justifyContent: "space-between"}}>
                    <Title
                        level={2}
                        style={{color: "white", lineHeight: "inherit", marginBottom: 0}}
                    >
                        Meal Time
                    </Title>
                    {/*Display cart successfully logged in, else display sign up form*/}
                    <div>{authed ? <MyCart/> : <SignupForm/>}</div>
                </div>
            </Header>
            <Content
                style={{
                    padding: "50px",
                    maxHeight: "calc(100% - 64px)",
                    overflowY: "auto"
                }}
            >
                {/*Displace food list if successfully logged in, else, display LoginForm*/}
                {authed ? (
                    <FoodList/>
                ) : (
                    <LoginForm onSuccess={() => setAuthed(true)}/>
                )}
            </Content>
        </Layout>
    );
}


export default App;
