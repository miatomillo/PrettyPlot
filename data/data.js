var drawPlot = function(counties,target,
                         xScale,yScale)
{
    target
    .selectAll("circle")
    .data(counties)
    .enter()
    .append("circle")
    .attr("cx",function(county)
    {
        return xScale(county.white_pct);   
    })
    .attr("cy",function(county)
    {
        return yScale(county.trumpPercentage);    
    })
    .attr("r",2.5)
    .attr("class",function(county)
    {
        if(county.lesscollege_pct<80)
        {
            return "lesscollege"        
        }
        else if(county.clf_unemploy_pct<6)
        {
            return "unemployment";        
        }
    })
    .on("mouseenter" ,function(county)
      {
        
      var xPos = d3.event.pageX;
      var yPos = d3.event.pageY;
      
        d3.select("#tooltip")
        .classed("hidden",false)
        .style("top",yPos+"px")
        .style("left",xPos+"px")
        
        d3.select("#state")
        .text(county.state);
        
        d3.select("#county")
        .text(county.county);
      })
    .on("mouseleave",function()
    {
        d3.select("#tooltip")    
        .classed("hidden",true);
    })
}
var makeTranslateString = function(x,y)
{
    return "translate("+x+","+y+")";
}

var drawAxes = function(graphDim,margins,
                         xScale,yScale)
{
var xAxis= d3.axisBottom(xScale)
  var yAxis=d3.axisLeft(yScale)
d3.select("svg")
        .append("g")
         .attr("transform","translate("+margins.left+","+(margins.top+graphDim.height)+")")
        .call(xAxis)
d3.select("svg")
        .append("g")
         .attr("transform","translate("+margins.left+"," +(margins.top)+")")
        .call(yAxis)
}
var drawLabels = function(graphDim,margins)
{
var Labels= d3.select("svg")
        .append("g")
        .classed("labels",true)
Labels.append("text")
     .text("Support For Trump")
    .classed("title", true)
     .attr("text-anchor","middle")
 .attr("x",margins.left+(graphDim.width/2))
    .attr("y",margins.top*1.5)
 Labels.append("text")
    .text("Percent White")
    .classed("label",true)
    .attr("text-anchor","middle")
    .attr("x", margins.left+(graphDim.width/2))
    .attr("y",screen.height*.75)
Labels.append("g")
    .attr("transform","translate(15,"+(margins.top+(graphDim.height/2))+")")
    .append("text")
    .text("Percentage Voting for Trump")
    .classed ("label",true)
    .attr("text-anchor","middle")
    .attr("transform","rotate(270)")
}
var drawLegend = function(graphDim,margins)
{
var Legend = d3.select("svg")
    .append("g")
    .classed("legend", true)
    .attr("transform","translate("+(margins.left+10) +"," + (margins.top+10)+")");
var categories = [
       {
           class:"lessCollege",
           name:"Less College"
       },
       {
           class:"unemployment",
           name:"High unemployment"
       }
    ]
var entries=Legend.selectAll("g")
    .data(categories)
    .enter()
    .append("g")
    .classed("legendEntry",true)
    .attr("class", function(category)
             {
            return category.class;
        })
        .attr("transform", function(category,index)
             {
                return "translate(0,"+(index*20)+")";
        })
entries.append("rect")
            .attr("width",10)
            .attr("height",10)
entries.append("text")
            .text(function(category)
                 {return category.name})
            .attr("x",15)
            .attr("y",10)}

var initGraph = function(counties)
{
    var screen = {width:800,height:600}
    var screen = {width:870,height:600}
    var margins = {left:30,right:20,top:20,bottom:30}
    var margins = {left:50,right:20,top:20,bottom:40}
var graph = 
        {
            width:screen.width-margins.left-margins.right,
            height:screen.height - margins.top-margins.bottom
        }
    console.log(graph);
    
d3.select("svg")
    .attr("width",screen.width)
    .attr("height",screen.height)
    
var target = d3.select("svg")
    .append("g")
    .attr("id","#graph")
    .attr("transform",
          "translate("+margins.left+","+
                        margins.top+")");
var xScale = d3.scaleLinear()
        .domain([0,100])
        .range([0,graph.width])
var yScale = d3.scaleLinear()
        .domain([0,1])
        .range([graph.height,0])
    
    drawAxes(graph,margins,xScale,yScale);
    drawPlot(counties,target,xScale,yScale);
    drawLabels(graph,margins);
    drawLegend(graph,margins);}

var successFCN = function(counties)
{
    console.log("politics",counties);
    initGraph(counties);
}
var failFCN = function(error)
{
    console.log("error",error);
}

var polPromise = d3.csv("data/politics.csv")
polPromise.then(successFCN,failFCN); 
polPromise.then(successFCN,failFCN);
