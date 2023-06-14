<?php
 session_start();
include('../alt/nav-bar.php');
?>
<!DOCTYPE html>

<html lang="tr">
<head>
  <title>Birçözüm Duyurular</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
</head>
<body>


<div>
<div class="container" style="margin-top: 60px;">
    <div id="myCarousel" class="carousel slide" data-ride="carousel" style="height: 400px;">
      
      <ol class="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
      </ol>
  
     
      <div class="carousel-inner">
        <div class="item active">
          <img src="../imgs/bakircay.jpg" alt="Bakırçay" style="height:100%; width:100%; object-fit: cover;">
        </div>
  
        <div class="item">
          <img src="../imgs/seyrek.jpeg" alt="Seyrek" style="height:100%; width:100%; object-fit: cover;">
        </div>
      
        <div class="item">
          <img src="../imgs/villakent.jpg" alt="Villakent" style="height:100%; width:100%; object-fit: cover;">
        </div>
      </div>
  

      <!-- Left and right controls -->
      <a class="left carousel-control" href="#myCarousel" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="right carousel-control" href="#myCarousel" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
  
<!-- Slider-->
<hr>


<!-- Duyurular Div-->
<div class="container">
    <div class="jumbotron">
      <h1>Duyurular</h1>      
      <p>Seyrek ve Villakent mahallelerinde yaşanacak olan gelişmeler.</p>
    </div>
    <div class="well"> Seyrek Mahallesi genelinde ilaçlama yapılacaktır.</div>     
    <div class="well">Villakent Su Kesintisi : 30.06.2023 </div>
    <div class="well">Seyrek Mahallesi genelinde ilaçlama yapılacaktır.</div>
    <div class="well">Seyrek Mahallesi genelinde ilaçlama yapılacaktır.</div>
  </div> <!-- Duyurular Div-->


<hr>
</div> <!-- main div ends here -->

</body>


<?php include('../alt/footer.php');?>


</html>
