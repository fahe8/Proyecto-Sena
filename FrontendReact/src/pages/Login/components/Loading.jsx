
import React from "react";
import "./loading.css"
const Loading = () => {
  return (

    <svg class="pl" viewBox="0 0 56 56" width="56px" height="56px" role="img" aria-label="Soccer ball">
        <clipPath id="ball-clip">
            <circle r="8" />
        </clipPath>
        <defs>
            <path id="hex" d="M 0 -9.196 L 8 -4.577 L 8 4.661 L 0 9.28 L -8 4.661 L -8 -4.577 Z" />
            <g id="hex-chunk" fill="none" stroke="hsl(var(--hue),10%,10%)" stroke-width="0.5">
                <use href="#hex" fill="hsl(var(--hue),10%,10%)" />
                <use href="#hex" transform="translate(16,0)"/>
                <use href="#hex" transform="rotate(60) translate(16,0)"/>
            </g>
            <g id="hex-pattern" transform="scale(0.333)">
                <use href="#hex-chunk" />
                <use href="#hex-chunk" transform="rotate(30) translate(0,48) rotate(-30)" />
             
                <use href="#hex-chunk" transform="rotate(-180) translate(0,27.7) rotate(180)" />
                <use href="#hex-chunk" transform="rotate(-120) translate(0,27.7) rotate(120)" />
                <use href="#hex-chunk" transform="rotate(-60) translate(0,27.7) rotate(60)" />
                <use href="#hex-chunk" transform="translate(0,27.7)" />
                <use href="#hex-chunk" transform="rotate(60) translate(0,27.7) rotate(-60)" />
                <use href="#hex-chunk" transform="rotate(120) translate(0,27.7) rotate(-120)" />
            </g>
            <g id="ball-texture" transform="translate(0,-3.5)">
                <use href="#hex-pattern" transform="translate(-48,0)" />
                <use href="#hex-pattern" transform="translate(-32,0)" />
                <use href="#hex-pattern" transform="translate(-16,0)" />
                <use href="#hex-pattern" transform="translate(0,0)" />
                <use href="#hex-pattern" transform="translate(16,0)" />
            </g>
        </defs>
        <filter id="ball-shadow-inside">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
        </filter>
        <filter id="ball-shadow-outside">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
        </filter>
        <g transform="translate(28,28)">
            <g class="pl__stripe-dot-group" fill="var(--green)">
                <circle class="pl__stripe-dot" transform="rotate(32) translate(-18.25,0)" />
                <circle class="pl__stripe-dot" transform="rotate(87) translate(-18.25,0)" />
                <circle class="pl__stripe-dot" transform="rotate(103) translate(-18.25,0)" />
                <circle class="pl__stripe-dot" transform="rotate(138) translate(-18.25,0)" />
                <circle class="pl__stripe-dot" transform="rotate(228) translate(-18.25,0)" />
                <circle class="pl__stripe-dot" transform="rotate(243) translate(-18.25,0)" />
                <circle class="pl__stripe-dot" transform="rotate(328) translate(-18.25,0)" />
            </g>
            <g class="pl__stripe-dot-group" fill="var(--white)">
                <circle class="pl__stripe-dot" transform="rotate(41) translate(-15.75,0)" />
                <circle class="pl__stripe-dot" transform="rotate(77) translate(-15.75,0)" />
                <circle class="pl__stripe-dot" transform="rotate(92) translate(-15.75,0)" />
                <circle class="pl__stripe-dot" transform="rotate(146) translate(-15.75,0)" />
                <circle class="pl__stripe-dot" transform="rotate(175) translate(-15.75,0)" />
                <circle class="pl__stripe-dot" transform="rotate(293) translate(-15.75,0)" />
                <circle class="pl__stripe-dot" transform="rotate(314) translate(-15.75,0)" />
                <circle class="pl__stripe-dot" transform="rotate(340) translate(-15.75,0)" />
            </g>
            <g class="pl__stripe-dot-group" fill="var(--green)">
                <circle class="pl__stripe-dot" transform="rotate(20) translate(-13.25,0)" />
                <circle class="pl__stripe-dot" transform="rotate(55) translate(-13.25,0)" />
                <circle class="pl__stripe-dot" transform="rotate(77) translate(-13.25,0)" />
                <circle class="pl__stripe-dot" transform="rotate(106) translate(-13.25,0)" />
                <circle class="pl__stripe-dot" transform="rotate(128) translate(-13.25,0)" />
                <circle class="pl__stripe-dot" transform="rotate(174) translate(-13.25,0)" />
                <circle class="pl__stripe-dot" transform="rotate(279) translate(-13.25,0)" />
            </g>
            <g fill="none" stroke-linecap="round" stroke-width="2.5" transform="rotate(-90)">
                <g class="pl__stripe-rotate">
                    <circle class="pl__stripe pl__stripe--1" r="18.25" stroke="var(--green)" stroke-dasharray="114.7 114.7" />
                </g>
                <g class="pl__stripe-rotate">
                    <circle class="pl__stripe pl__stripe--2" r="15.75" stroke="var(--white)" stroke-dasharray="106.8 106.8" />
                </g>
                <g class="pl__stripe-rotate">
                    <circle class="pl__stripe pl__stripe--3" r="13.25" stroke="var(--green)" stroke-dasharray="99 99" />
                </g>
            </g>
            <g class="pl__ball" transform="translate(0,-15.75)">
                <circle class="pl__ball-shadow" filter="url(#ball-shadow-outside)" fill="hsla(var(--hue),10%,10%,0.5)" r="8" cx="1" cy="1" />
                <circle fill="var(--white)" r="8" />
                <g clip-path="url(#ball-clip)">
                    <use class="pl__ball-texture" href="#ball-texture" />
                </g>
                <circle class="pl__ball-shadow" clip-path="url(#ball-clip)" filter="url(#ball-shadow-inside)" fill="none" stroke="hsla(var(--hue),10%,10%,0.3)" stroke-width="5" r="12" cx="-4" cy="-4" />
            </g>
        </g>
    </svg>

  );
};

export default Loading;
