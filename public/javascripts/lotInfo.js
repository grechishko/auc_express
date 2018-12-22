var tabIndex = 0;
switchTab(tabIndex);

function  currentTab(n) {
    tabIndex = n;
    switchTab(tabIndex);
}

function switchTab(n) {
    let i;
    let tabs = document.querySelectorAll('.tabs > div');
    let info = document.querySelectorAll('.info > div');

    for (i = 0; i < tabs.length; i ++) {
        tabs[i].className = '';
    }

    for (i = 0; i < info.length; i ++) {
        info[i].className = '';
    }

    tabs[n].className = 'active';
    info[n].className = 'active';
}