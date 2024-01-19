import { Component } from "react";
import { useNavigate, useParams } from "react-router-dom";
export const withNavigation = (Component) => {
    return (props) => <Component {...props} navigate={useNavigate()} />;
};
export const withParams = (Component) => {
    return (props) => <Component {...props} params={useParams()} />;
};

class CompaniesEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            email: "",
            address: "",
            website: "",
            errors: {},
            isLoading: false,
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleWebsiteChange = this.handleWebsiteChange.bind(this);
    }
    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }
    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }
    handleAddressChange(event) {
        this.setState({ address: event.target.value });
    }
    handleWebsiteChange(event) {
        this.setState({ website: event.target.value });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.isLoading) return;
        this.setState({ errors: {}, isLoading: true });
        axios
            .put("/api/companies/" + this.state.id, {
                name: this.state.name,
                email: this.state.email,
                address: this.state.address,
                website: this.state.website,
            })
            .then((response) => this.props.navigate("/dashboard"))
            .catch((error) =>
                this.setState({ errors: error.response.data.errors })
            )
            .finally(() => this.setState({ isLoading: false }));
    };
    componentDidMount() {
        this.setState({ isLoading: true });
        axios
            .get("/api/companies/" + this.props.params.id)
            .then((response) => {
                this.setState({ id: response.data.data.id });
                this.setState({ name: response.data.data.name });
                this.setState({ email: response.data.data.email });
                this.setState({ address: response.data.data.address });
                this.setState({ website: response.data.data.website });
            })
            .finally(() => this.setState({ isLoading: false }));
    }
    errorMessage(field) {
        return (
            <div className="text-red-600 mt-1">
                {this.state.errors?.[field]?.map((message, index) => {
                    return <div key={index}>{message}</div>;
                })}
            </div>
        );
    }
    render() {
        return (
            <form className="space-y-6" onSubmit={this.handleSubmit}>
                {/* ... form fields and error messages */}
                <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase bg-gray-800 rounded-md border border-transparent ring-gray-300 transition duration-150 ease-in-out hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring disabled:opacity-25"
                >
                    Save
                </button>
            </form>
        );
    }
}
export default withParams(withNavigation(CompaniesEdit));
