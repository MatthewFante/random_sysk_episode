function fetchRandomEpisode() {
    const xmlURL = 'https://feeds.megaphone.fm/stuffyoushouldknow';

    // Fetch the XML data
    fetch(xmlURL)
        .then(response => response.text())
        .then(xmlData => {
            // Parse the XML data
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlData, 'application/xml');

            // Select all <item> elements
            const items = xmlDoc.querySelectorAll('item');

            // Choose a random item
            const randomItem = items[Math.floor(Math.random() * items.length)];

            // Extract the URL from the <enclosure> element of the random item
            const url = randomItem.querySelector('enclosure').getAttribute('url');
            const title = randomItem.querySelector('title').innerHTML;
            const description = randomItem.querySelector('description').innerHTML;

            // Set the audio source to the random URL
            const randomAudio = document.getElementById('randomAudio');
            randomAudio.src = url;

            const epTitle = document.getElementById('epTitle');
            epTitle.innerHTML = title;

            const epDescription = document.getElementById('epDescription');
            epDescription.innerHTML = description;
        })
        .catch(error => {
            console.error('An error occurred:', error);
        });
}

window.onload = (event) => {
    fetchRandomEpisode();
}


$('#nextButton').click(() => {
    fetchRandomEpisode();
    document.getElementById('randomAudio').play();
});
;
