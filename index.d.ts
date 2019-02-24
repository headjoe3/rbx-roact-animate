import Roact = require("rbx-roact");

export = RoactAnimate
export as namespace RoactAnimate

declare class Connection {
    Disconnect(): void
}

declare class Signal<T extends (...args: any[]) => void> {
    Connect(listener: T): Connection
    Fire(...args: FunctionArguments<T>): void
}

declare class Animation<T> {
    constructor(value: AnimatedValue<T>, tweenInfo: TweenInfo, to: T)
    /** Starts the animation */
    Start(): void
    /** Called when the animation is completed */
    AnimationFinished: Signal<() => void>
}

declare class AnimatedValue<T> {
    Value: T
    AnimationStarted: Signal<(toValue: T, tweenInfo: TweenInfo) => void>
    /** Called when a tween on the value has finished */
    AnimationFinished: Signal<() => void>
    /** Called whenever the value is changed through the :Change() method, either externally, or through a PrepareStep. */
    Changed: Signal<(newValue: T) => void>
    /** 
     * Triggers a change in the value. This immediately changes the value for all
     * objects it is used in, with no animation.
     */
    Change(newValue: T): void
    /** 
     * Starts an animation over the property's value, using supplied tween properties.
     */
    StartAnimation(toValue: T, tweenInfo: TweenInfo): void
    /**
     * Finishes an animation; called by animated components.
     */
    FinishAnimation(): void
    constructor(initial: T)
}

declare class AnimationSequence {
    /** Starts the animation sequence. All animations are run asynchronously; this
     * method does not yield!
     * 
     * If called when the animation sequence is already playing, this will halt
     * the current sequence and start over from the beginning.
     */
    Start(): void
    /** Called when the full animation sequence has completed. */
    AnimationFinished: Signal<() => void>
}

/**
 * A "prepare" step.
 * Exposes the same API as Animation/AnimationSequence, but instantly completes its goal.
 */
declare class PrepareStep{
    /** "Starts" the step, instantly changing the value to the specified new value. */
    Start(): void
    AnimationFinished: Signal<() => void>
}

declare type WrappedPartial<RBX> = {
    [P in keyof RBX]?: RBX[P] | AnimatedValue<RBX[P]> | undefined
}

declare class AnimationWrapper<RBX> extends Roact.Component<Partial<RBX>> {
    constructor(props: WrappedPartial<RBX>)
    render(): Roact.Element
}

declare namespace RoactAnimate {
    /** 
     * Creates an animation for a value.
     */
    function Animate<T>(value: AnimatedValue<T>, tweenInfo: TweenInfo, to: T): Animation<T>
    /** 
     * Creates an animation from a table of animations.
     * These animations will be run one-by-one.
     */
    function Sequence(animations: Animation<any>[]): AnimationSequence
    /** 
     * Creates an animation from a table of animations.
     * These animations will be run all at once.
     */
    function Parallel(animations: Animation<any>[]): AnimationSequence
    /** 
     * Creates a preparation step.
     * This allows instantaneous resetting of a value prior to animations completing.
     */
    function Prepare<T>(value: AnimatedValue<T>, to: T): PrepareStep
    /** 
     * Creates an animated component from a primitive class (e.g. "Frame")
     */
    function makeAnimatedComponent(elementType: string): Roact.Component

    class Frame extends AnimationWrapper<Rbx_Frame> {}
    class TextButton extends AnimationWrapper<Rbx_TextButton> {}
    class ImageLabel extends AnimationWrapper<Rbx_ImageLabel> {}
    class ImageButton extends AnimationWrapper<Rbx_ImageButton> {}
    class TextBox extends AnimationWrapper<Rbx_TextBox> {}
    class TextLabel extends AnimationWrapper<Rbx_TextLabel> {}
    class ScrollingFrame extends AnimationWrapper<Rbx_ScrollingFrame> {}

    class Value<T> extends AnimatedValue<T> {}
}
// declare function RoactAnimate<T>(value: AnimatedValue<T>, tweenInfo: TweenInfo, to: T): Animation<T>