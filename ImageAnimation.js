/*
* (The MIT License)
* Copyright (c) 2015-2016 YunJiang.Fang <42550564@qq.com>
*/
'use strict';

import React from 'react';
import { Image, Animated } from 'react-native';
import TimerMixin from 'react-timer-mixin';
import PropTypes from 'prop-types';

module.exports = React.createClass({
    propTypes: {
        animationImages : PropTypes.array.isRequired,
        animationRepeatCount : PropTypes.number,
        animationDuration : PropTypes.number,
    },
    mixins: [TimerMixin],
    getInitialState: function () {
        return {
            imageIndex: 0,
            fadeAnim: 1//new Animated.Value(1)
        };
    },
    componentDidMount: function () {
        this.animationRepeatCount = this.props.animationRepeatCount || 0;
        this.intervalId = this.setInterval(
            () => {
                Animated.timing(
                  this.state.fadeAnim,
                  { toValue: 0, duration: 500} ).start();
                let imageIndex = this.state.imageIndex + 1;
                if (imageIndex >= this.props.animationImages.length) {
                    imageIndex = 0;
                    if (this.animationRepeatCount === 1) {
                        this.clearInterval(this.intervalId);
                        return;
                    }
                    this.animationRepeatCount--;
                }
                this.setState({ imageIndex:imageIndex }, function() {
                  Animated.timing(
                    this.state.fadeAnim,
                    { toValue: 1, duration: 500 } ).start();
                });
            }, this.props.animationDuration || 1000);
    },
    render: function () {
        return (
            <Image
                {...this.props}
                style={[this.props.style, {opacity: this.state.fadeAnim}]}
                source={this.props.animationImages[this.state.imageIndex]} />
        );
    },
});
