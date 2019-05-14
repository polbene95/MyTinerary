import React, {Component} from "react";

class CityNode extends Component {

    render() {
        return (
        <div style={{backgroundImage: "url("+ this.props.src +")"}} className={(this.show() ? 'show' : 'hidden')}>
            <div>
                <div style={{backgroundImage: "url("+ this.props.src +")"}}>
                    <div>
                        <p>{this.props.name}</p>
                    </div>
                </div>
            </div>
        </div>
        )
    }

    show() {
        if (this.props.index === this.props.current)
            return true
        return false
    }
}

export default CityNode