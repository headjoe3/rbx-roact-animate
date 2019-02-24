# roact-animate
Roblox-TS typings for AmaranthineCodices' [RoactAnimate](https://github.com/AmaranthineCodices/roact-animate)

## Installation
`npm install rbx-roact-animate`

## Example (tsx)
```jsx
import Roact = require("rbx-roact");
import RoactAnimate = require("rbx-roact-animate");

interface Props {
    // Marker that this component can have children
    [Roact.Children]?: Roact.Element[]
}

interface State {
    Size: RoactAnimate.Value<UDim2>
    Transparency: RoactAnimate.Value<number>
    Color: RoactAnimate.Value<Color3>
}

export class TestComponent extends Roact.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        
        this.setState({
            Transparency: new RoactAnimate.Value(1),
            Size: new RoactAnimate.Value(new UDim2(0, 100, 0, 100)),
            Color: new RoactAnimate.Value(new Color3(1, 1, 1)),
        })
    }
    didMount() {
        spawn(() => {
            while (true) {
                wait(3)
    
                RoactAnimate.Sequence([
                    RoactAnimate.Parallel([
                        RoactAnimate.Prepare(this.state.Transparency, 1),
                        RoactAnimate.Prepare(this.state.Size, new UDim2(0, 100, 0, 100)),
                        RoactAnimate.Prepare(this.state.Color, new Color3(1, 1, 1)),
                    ]),
                    RoactAnimate.Animate(
                        this.state.Transparency,
                        new TweenInfo(1),
                        0),
                    RoactAnimate.Parallel([
                        RoactAnimate.Animate(this.state.Size,
                            new TweenInfo(0.5),
                            new UDim2(0, 200, 0, 50)),
                        RoactAnimate.Animate(this.state.Color,
                            new TweenInfo(0.5),
                            new Color3(0.5, 0.1, 1)),
                    ])
                ]).Start()
            }
        })
    }
    render() {
        return (
            <RoactAnimate.Frame
                BackgroundTransparency = {this.state.Transparency}
                Position = {new UDim2(0.5, 0, 0.5, 0)}
                Size = {this.state.Size}
                BackgroundColor3 = {this.state.Color}
                // Pass children through
                {...{[Roact.Children]: this.props[Roact.Children]}}
            />
        )
    }
    
}

const testTree = (
    <screengui>
        <TestComponent>
        </TestComponent>
    </screengui>
)

export function mountTest() {
    Roact.mount(testTree, game.Players.LocalPlayer.WaitForChild("PlayerGui"))
}

// Call mountTest() here or in another .ts file
```
![Example](https://i.imgur.com/jQisHae.gif)
