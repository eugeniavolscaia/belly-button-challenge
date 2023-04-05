// Get the samples endpoint
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

 // Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data); 
// Create variables for the data arrays
let names = data.names;
let samples = data.samples;
let metadata = data.metadata;
  
// Create initial function
  function init(){
    // Populate the dropdown from the list/array
    let selector = d3.select("#selDataset");              
    for (let i = 0; i < names.length; i++){
        selector.append("option").text(names[i]).property("value", names[i]);
    };
    // Select plot data based on the initial id
    let initData = data.samples[0];
    // Create trace and layout for the initial bar graph  
    let traceBar = {
      x : initData.sample_values.slice(0,10).reverse(),
      y : initData.otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
      text: initData.otu_labels.slice(0,10).reverse(), 
      type : "bar",
      orientation: "h" 
    };
    let layoutBar = {
      margin: { l: 100, r:10, b:50, t: 50}
    };
    Plotly.plot("bar",[traceBar], layoutBar);
    // Create trace and layout for the initial bubble graph
    let traceBubble = {
      x : initData.otu_ids,
      y : initData.sample_values,
      text : initData.otu_labels,
      mode : "markers",
      marker: {
        color : initData.otu_ids,
        size : initData.sample_values,
      }
    };
    let layoutBubble = {
      xaxis: { title: "OTU ID" },
      margin: { t: 0 }
      };
    Plotly.plot("bubble",[traceBubble], layoutBubble);
    // Select array data based on the initial id
    let initMeta = data.metadata[0];
    // Display Demographic Info data
    d3.select(".panel-body").text(`id: ${initMeta.id}`);
    d3.select(".panel-body").append("li").text(`ethnicity: ${initMeta.ethnicity}`);
    d3.select(".panel-body").append("li").text(`gender: ${initMeta.gender}`);
    d3.select(".panel-body").append("li").text(`age: ${initMeta.age}`);
    d3.select(".panel-body").append("li").text(`location: ${initMeta.location}`);
    d3.select(".panel-body").append("li").text(`bbtype: ${initMeta.bbtype}`);
    d3.select(".panel-body").append("li").text(`wfreq: ${initMeta.wfreq}`);    
  };
  // Create function for the dropdown option plots
  function updatePlotly(){
    let selector = d3.select("#selDataset");  
    // Assign the value of the dropdown menu option to a variable
    let option = selector.property("value");
    // Loop through the sample array 
    for (let i = 0; i < samples.length; i++) {
      // Create variable to hold current sample in loop
      let sample = samples[i]
      if (sample.id === option){
         
        // Create trace and layout for the Bar chart
        let traceBar = {
          x : sample.sample_values.slice(0,10).reverse(),
          y : sample.otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
          text: sample.otu_labels.slice(0,10).reverse(), 
          type : "bar",
          orientation: "h" 
        };
        let layoutBar = {
          margin: { l: 100, r:10, b:50, t: 50}
        };     
        Plotly.newPlot("bar",[traceBar], layoutBar);

        // Create trace and layout for the Bubble chart
        let traceBubble = {
          x : sample.otu_ids.slice(0, 10).reverse(),
          y : sample.sample_values.slice(0,10).reverse(),
          text : text,
          mode : "markers",
          marker: {
            color : sample.otu_ids.slice(0, 10).reverse(),
            size : sample.sample_values.slice(0,10).reverse(),
          }
        };
        let layoutBubble = {
          xaxis: { title: "OTU ID" },
          margin: { t: 0 }
          };
        Plotly.newPlot("bubble", [traceBubble], layoutBubble);  

      }
    }
  }
  // Create function for the dropdown option Demo info
  function demo() {
    let selector = d3.select("#selDataset");  
    // Assign the value of the dropdown menu option to a variable
    let option = selector.property("value");
    // Loop through the metadata array 
    for (let i = 0; i < metadata.length; i++) {
      // Create variable to hold current data in loop
      let meta = metadata[i]
      if (meta.id === parseInt(option)){
        d3.select(".panel-body").text(`id: ${meta.id}`);
        d3.select(".panel-body").append("li").text(`ethnicity: ${meta.ethnicity}`);
        d3.select(".panel-body").append("li").text(`gender: ${meta.gender}`);
        d3.select(".panel-body").append("li").text(`age: ${meta.age}`);
        d3.select(".panel-body").append("li").text(`location: ${meta.location}`);
        d3.select(".panel-body").append("li").text(`bbtype: ${meta.bbtype}`);
        d3.select(".panel-body").append("li").text(`wfreq: ${meta.wfreq}`);
      }
    }
  }
  // Call the initial function
  init();
  // Call functions to update the charts and displayed data
  d3.selectAll("#selDataset").on("change", function(){
    demo();
    updatePlotly()});

});



