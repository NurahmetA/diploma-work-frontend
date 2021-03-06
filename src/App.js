import './App.css';
import {Component} from "react";
import AuthService from "./services/auth.service";
import SidebarLayout from "./layouts/sidebar.layout";
import MainContentLayout from "./layouts/main-content.layout";
import LoginPage from "./pages/common/login.page";

export const BASE_URL = 'https://diploma-aitu-backend.herokuapp.com/';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showStudentBoard: false,
            showAdviserBoard: false,
            showCommissionBoard: false,
            showSecretaryBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
            isGuestAccount: false
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user) {
            this.setState({
                currentUser: user,
                showStudentBoard: user.role.includes("ROLE_STUDENT"),
                showAdviserBoard: user.role.includes("ROLE_ADVISOR"),
                showCommissionBoard: user.role.includes("ROLE_COMMISSION"),
                showAdminBoard: user.role.includes("ROLE_ADMIN"),
                showSecretaryBoard: user.role.includes("ROLE_SECRETARY")
            });
        } else {
            this.setState({
                isGuestAccount: true
            });
        }

    }

    render() {
        return (
            <div>
                {this.state.isGuestAccount &&
                    <div className="d-flex align-items-center justify-content-center">
                        <LoginPage/>
                    </div>
                }
                {!this.state.isGuestAccount &&
                    <div className="wrapper d-flex align-items-stretch">
                        {!this.state.showCommissionBoard &&
                            <SidebarLayout isStudent={this.state.showStudentBoard}
                                           isAdviser={this.state.showAdviserBoard}
                                           isSecretary={this.state.showSecretaryBoard}
                                           isAdmin={this.state.showAdminBoard}/>
                        }
                        <MainContentLayout isStudent={this.state.showStudentBoard}
                                           isAdviser={this.state.showAdviserBoard}
                                           isCommission={this.state.showCommissionBoard}
                                           isAdmin={this.state.showAdminBoard}
                                           isSecretary={this.state.showSecretaryBoard}/>
                    </div>
                }
            </div>
        );
    }

}

export default App;
