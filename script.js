//You can edit ALL of the code here
var allEpisodes;

let shows = getAllShows();

let rootElem = document.getElementById("root");


// Shows Page

function showsPage() {
  shows.sort((a, b) => {
    let Na = a.name.toLowerCase();
    let Nb = b.name.toLowerCase();
    if (Na < Nb) return -1;
    if (Na > Nb) return 1;
    return 0;
  });
  document.body.innerText = "";
  rootElem = document.createElement("div");
  rootElem.id = "root";
  document.body.appendChild(rootElem);

  if (document.querySelector(".showsSelect")) {
    document.querySelector(".showsSelect").remove();
  }
  headerElements();
  listContainer(shows);
}

  //--------------------------------------------------------Level-6-----------------------------------------------------------

function showRerendering(shows1) {
  rootElem.innerText = "";
  listContainer(shows1);
  let showsbutton = document.createElement("button");
  showsbutton.className = "showsbutton";
  showsbutton.onclick = function () {
    showsPage(shows);
  };
  showsbutton.innerText = "back";
  rootElem.appendChild(showsbutton);
}


function headerElements() {
  let header = document.createElement("header");
  document.body.prepend(header);

  let label = document.createElement("label");
  label.innerText = "Filtering for";
  header.appendChild(label);

  let searchShow = document.createElement("input");
  searchShow.className = "searchShow";
  searchShow.onkeyup = function (event) {
    let searchtext = event.target.value.toLowerCase();
    let outputArr = [];
    shows.forEach((show) => {
      if (
        show.name.toLowerCase().includes(searchtext) ||
        show.summary.toLowerCase().includes(searchtext)
      ) {
        outputArr.push(show);
      }
    });
    if (outputArr.length < 1) {
      document.querySelector(".selectForShow").value = null;
      showRerendering(outputArr);
    } else {
      showRerendering(outputArr);
    }
  };
  searchShow.type = "text";
searchShow.placeholder="Search Shows here..."
  header.appendChild(searchShow);

  let foundShows = document.createElement("p");
  foundShows.className = "foundShows";
  header.appendChild(foundShows);

  let selectForShow = document.createElement("select");
  selectForShow.className = "selectForShow";
  selectForShow.onchange = displayShow;
  header.appendChild(selectForShow);
}

//function which triggered  when selecting the option

function displayShow(event) {
  document.querySelector(".searchShow").value = "";
  let id = event.target.value;
  shows.forEach((show) => {
    if (show.id == id) {
      showRerendering([show]);
    }
  });
}


function listContainer(shows) {
  
  document.querySelector(
    ".foundShows"
  ).innerHTML = `found ${shows.length} shows`;
  shows.forEach((show) => {
    let showOptions = document.createElement("option");
    showOptions.value = show.id;
    showOptions.innerText = show.name;
    showOptions.className = "showOption";
    document.querySelector(".selectForShow").appendChild(showOptions);

    let showbox = document.createElement("div");
    showbox.className = "showbox";
    showbox.onclick = function () {
      showRender(show.id);
    };
    rootElem.appendChild(showbox);

    let showName = document.createElement("h1");
    showName.className = "showName";
    showName.innerText = show.name;
    showbox.appendChild(showName);

    let innerBox = document.createElement("div");
    innerBox.className = "innerBox";
    showbox.appendChild(innerBox);

    let showImg = document.createElement("img");
    if (show.image) {
      showImg.src = show.image.medium;
    }
    showImg.alt="show image";
    innerBox.appendChild(showImg);

    let showSummary = document.createElement("div");
    showSummary.className = "showSummary";
    showSummary.innerHTML = show.summary;
    innerBox.appendChild(showSummary);

    let sideBox = document.createElement("div");
    sideBox.className = "sideBox";
    innerBox.appendChild(sideBox);

    let ratings = document.createElement("p");
    ratings.innerHTML = `<strong>Rated:</strong>${show.rating.average}`;
    ratings.className = "rating";
 sideBox.appendChild(ratings);

    let genres = document.createElement("p");
    genre = "";
    for (i = 0; i < show.genres.length; i++) {
      genre = genre + show.genres[i] + ",";
    }
    genres.innerHTML = `<strong>Genres:</strong>${genre}`;
    genres.className = "genres";
    sideBox.appendChild(genres);

    let status = document.createElement("p");
    status.innerHTML = `<strong>Status:</strong>${show.status}`;
    status.className = "status";
    sideBox.appendChild(status);

    let runtime = document.createElement("p");
    runtime.className = "runtime";
    runtime.innerHTML = `<strong>Runtime:</strong>${show.runtime}`;
    sideBox.appendChild(runtime);
  });
}

/////////////////////////////////////////////////////////////////////////////////



//Episodes Page

async function showRender(id) {
  
  
  //--------------------------------------------------------Level-4-----------------------------------------------------------
  let results = await fetch(`https://api.tvmaze.com/shows/${id}/episodes`);
  allEpisodes = await results.json();
  makePageForEpisodes(allEpisodes,id);
}


function onSelectFunc(event) {
  if (document.querySelector(".search").value) {
    document.querySelector(".search").value = "";
  }
  let value = event.target.value;
  allEpisodes.forEach((element) => {
    if (element.name === value) {
      reRender([element]);
    }
  });
  let button = document.createElement("button");
  button.innerText = "back";
  button.onclick = function () {
    makePageForEpisodes(allEpisodes);
  };
  rootElem.appendChild(button);
}

function searchingFunction(episodelist,id) {
  //--------------------------------------------------------Level-5-----------------------------------------------------------

  let showsSelect = document.createElement("select");
  showsSelect.className = "showsSelect";
  showsSelect.onchange = function (event) {
    let selectedValue = event.target.value;
    showRender(selectedValue);
  }
  
  document.body.prepend(showsSelect);
  let backbutton = document.createElement("button");
  backbutton.className="backToShowsPage";
  backbutton.innerText = "Back to Shows Page";
  backbutton.onclick = function () {
    showsPage(shows);
  };
  document.body.prepend(backbutton);

  shows.forEach((show) => {
    let option = document.createElement("option");
    option.value = show.id;
    option.innerText = show.name;
   
    if(id==show.id){
      option.setAttribute('selected','');
    }
    showsSelect.appendChild(option);
  });
    
  //--------------------------------------------------------Level-3-----------------------------------------------------------

  let selectEpisode = document.createElement("select");
  selectEpisode.className = "select";
  selectEpisode.onchange = onSelectFunc;
  rootElem.appendChild(selectEpisode);
  
  //--------------------------------------------------------Level-2-----------------------------------------------------------

  let searchEpisode = document.createElement("input");
  searchEpisode.type = "search";
  searchEpisode.placeholder="Search Episodes here..."
  searchEpisode.className = "search";
  rootElem.appendChild(searchEpisode);

 
}

function eventListenerFunction(allEpisodes,id) {
  document.querySelector(".search").addEventListener("keyup", listener);

  function listener(event) {
    let keyword = event.target.value.toLowerCase();
    let results = [];
    if (keyword) {
      allEpisodes.forEach((element) => {
        element.name.toLowerCase().includes(keyword) ||
        element.summary.toLowerCase().includes(keyword)
          ? (results.push(element))
          : "";
      });
      if (!results.length) {
        if (document.querySelector(".foundEpisodes")) {
          document.querySelector(".foundEpisodes").remove();
        }
        content.innerHTML = "<h1>NO RESULTS FOUND</h1>";
        let button = document.createElement("button");
        button.onclick = function makePage() {
          document.querySelector(".search").remove();
          document.querySelector(".select").remove();
          content.remove();
          button.remove();
          makePageForEpisodes(allEpisodes);
        };
        button.innerText = "BACK";
        content.appendChild(button);
      } else {
        reRender(results,id);
      }
      document.querySelector(".search").removeEventListener("keyup", listener);
    } else {
      reRender(allEpisodes,id);
    }
  }
}

function foundEpisodesAndContent(episodeList) {
  let foundEpisodes = document.createElement("p");
  foundEpisodes.innerText =
    episodeList.length == 1
      ? `Got ${episodeList.length} episode`
      : `Got ${episodeList.length} episodes`;
  foundEpisodes.className = "foundEpisodes";
  rootElem.appendChild(foundEpisodes);
}

function dom(episodeList) {
  //--------------------------------------------------------Level-1-----------------------------------------------------------

  content = document.createElement("div");
  content.className = "contents";
  rootElem.appendChild(content);
  episodeList.forEach((element) => {
    const episodeCode =
      element.number < 10
        ? `S0${element.season}E0${element.number}`
        : `S0${element.season}E${element.number}`;

    let selectOption = document.createElement("option");
    selectOption.value = element.name;

    selectOption.innerText = `${element.name}-${episodeCode}`;
    document.querySelector(".select").appendChild(selectOption);

    let box = document.createElement("div");
    box.className = "box";
    content.appendChild(box);

    let header = document.createElement("div");
    header.className = "header";
    box.appendChild(header);

    let h2 = document.createElement("h2");
    h2.innerText = `${element.name}-${episodeCode}`;
    header.appendChild(h2);

    let image = document.createElement("img");
    if(element.image){
    image.src = element.image.medium;
    image.alt='Episode image';
    }
    box.appendChild(image);

    let summary = document.createElement("div");
    summary.className = "summary";
    summary.innerHTML = element.summary;
    box.appendChild(summary);
  });
}

function makePageForEpisodes(episodeList,id) {
  document.body.innerText = "";
  rootElem = document.createElement("div");
  rootElem.id = "root";
  document.body.appendChild(rootElem);
  searchingFunction(episodeList,id);
  eventListenerFunction(episodeList,id);
  foundEpisodesAndContent(episodeList);
  dom(episodeList);
}

function reRender(episodeList,id) {
  content.innerHTML = "";
  if (document.querySelector(".foundEpisodes")) {
    document.querySelector(".foundEpisodes").remove();
  }
  let  showsSelect=document.querySelector('.showsSelect');
  showsSelect.innerHTML="";
  shows.forEach(show=>{
     let option=document.createElement('option');
  option.value = show.id;
    option.innerText = show.name;
    if(id===show.id){
      option.setAttribute('selected','');
    }
    showsSelect.appendChild(option);
  })
  eventListenerFunction(allEpisodes);
  foundEpisodesAndContent(episodeList);
  dom(episodeList);
}








window.onload = showsPage;
