<div>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
<nav class="navbar navbar-inverse navbar-fixed-top"style="background-color:#9A9CEA;">
    <div class="container-fluid">
    <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>                        
        </button>
        <a class="navbar-brand" style="color:white;" href="../index.php">BirCözüm</a>
    </div>
    
    <div>
        <div class="collapse navbar-collapse" id="myNavbar">
        <ul class="nav navbar-nav">
            <li><a href="../index.php#section1" style="color:white;">Duyurular</a></li>
            <li><a href="../index.php#section2" style="color:white;">Şikayetler</a></li>
            <li><a href="../index.php#section3" style="color:white;">Öneriler</a></li>
            <li><a href="../php/sikayetler.php" style="color:white;">Sikayetler/Detaylı</a></li>
            <li><a href="../php/öneriler.php" style="color:white;">Öneriler/Detaylı</a></li>
            <li><a href="../alt/duyurular.php" style="color:white;">Duyurular/Detaylı</a></li>
            <li><a href="../php/grafik.php" style="color:white;">İstatistikler</a></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
            <?php
            if(isset($_SESSION['loggedin'])){
                echo '<li ><a class="menu" style="color:white;" href="../php/logout.php"><span class="	glyphicon glyphicon-log-out"></span> Çıkış Yap </a> </li>';
                echo '<li ><a class="menu" style="color:white;" href="../php/hesabim.php"><span class="	glyphicon glyphicon-user"></span> Hesabım </a> </li>';
            }
            else {
                echo '<li ><a id="regElement" class="menu" style="color:white;" href="../alt/register.html"><span class="	glyphicon glyphicon-user"></span> Kayıt Ol </a> </li>';
                echo '<li ><a class="menu" style="color:white;" href="../alt/login.html"><span class="	glyphicon glyphicon-log-in"></span> Giriş Yap </a> </li>';
            }
            ?>
        </ul>
        </div>
    </div>
    </div>
</nav>
</div>