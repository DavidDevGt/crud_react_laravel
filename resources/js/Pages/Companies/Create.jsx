import { Component } from "react";
import { useNavigate } from "react-router-dom";
export const withNavigation = (Component) => {
    return (props) => <Component {...props} navigate={useNavigate()} />;
};

class CompaniesCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            address: "",
            website: "",
            errors: {},
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
        axios
            .post("/api/companies", {
                name: this.state.name,
                email: this.state.email,
                address: this.state.address,
                website: this.state.website,
            })
            .then((response) => {
                this.props.navigate("/dashboard");
            })
            .catch((error) =>
                this.setState({ errors: error.response.data.errors })
            );
    };
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
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Nombre
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        onChange={this.handleNameChange}
                        value={this.state.name}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    {this.errorMessage("name")}
                </div>

                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        onChange={this.handleEmailChange}
                        value={this.state.email}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    {this.errorMessage("email")}
                </div>

                <div>
                    <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Dirección
                    </label>
                    <input
                        id="address"
                        name="address"
                        type="text"
                        onChange={this.handleAddressChange}
                        value={this.state.address}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    {this.errorMessage("address")}
                </div>

                <div>
                    <label
                        htmlFor="website"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Sitio Web
                    </label>
                    <input
                        id="website"
                        name="website"
                        type="url"
                        onChange={this.handleWebsiteChange}
                        value={this.state.website}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    {this.errorMessage("website")}
                </div>

                <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase bg-gray-800 rounded-md border border-transparent ring-gray-300 transition duration-150 ease-in-out hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring disabled:opacity-25"
                >
                    Crear
                </button>
            </form>
        );
    }
}
export default withNavigation(CompaniesCreate);
