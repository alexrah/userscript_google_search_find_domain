// ==UserScript==
// @name         Google Search find domain
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  For any search, iterate through all SERP to find if a particular domain appear
// @author       Alessandro Stoppato
// @match        https://www.google.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const filter_term = document.createElement('input');
    const filter_submit = document.createElement('button');
    filter_submit.innerHTML = 'set';
    const filter_wrap = document.createElement('div');
    filter_wrap.classList.add('filter-wrap');
    filter_wrap.appendChild(filter_term);
    filter_wrap.appendChild(filter_submit);
    const before_appbar = document.getElementById('before-appbar');
    before_appbar.appendChild(filter_wrap);

    filter_submit.addEventListener('click',(event)=>{
        event.preventDefault();
        if(filter_term.value.length){
            testlink(filter_term.value);
            localStorage.setItem('filter_term', filter_term.value);
        } else {
            localStorage.removeItem('filter_term');
        }
    })

    if(localStorage.getItem('filter_term')){
        testlink(localStorage.getItem('filter_term'));
    }



    function testlink(string){

        let index = 0;
        let res = document.querySelectorAll('.g .rc a');
        let click = document.querySelector('#pnnext');

        res.forEach(elem=>{
            if(elem.href.indexOf(string) > -1) {
                console.log(elem.href);
                index++;
            } else {
                console.log(string+" not found")
            }
        });

        if(click && index == 0) {
            setTimeout(function(){
                click.click();
            },2000);
        }

}


})()
