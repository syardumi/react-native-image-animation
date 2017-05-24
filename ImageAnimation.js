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
        fadeDuration: PropTypes.number,
        enableFadeInOut: PropTypes.boolean
    },
    mixins: [TimerMixin],
    getInitialState: function () {
        return {
            imageIndex: 0,
            fadeAnim: new Animated.Value(1)
        };
    },
    componentDidMount: function () {
        var _this = this;
        this.animationRepeatCount = this.props.animationRepeatCount || 0;
        this.intervalId = this.setInterval(
            () => {
                if (this.props.enableFadeInOut) {
                  Animated.timing(
                    this.state.fadeAnim,
                    { toValue: 0, duration: this.props.fadeDuration || 500} ).start();
                }
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
                  setTimeout(function() {
                    if (_this.props.enableFadeInOut) {
                      Animated.timing(
                        _this.state.fadeAnim,
                        { toValue: 1, duration: _this.props.fadeDuration || 500 } ).start();
                    }
                  }, _this.props.fadeDuration || 500);
                });
            }, this.props.animationDuration || 1000);
    },
    render: function () {
        return (
            <Animated.Image
                {...this.props}
                style={[this.props.style, {opacity: this.state.fadeAnim}]}
                source={this.props.animationImages[this.state.imageIndex]} />
        );
    },
});
