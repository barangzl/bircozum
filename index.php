<?php
  session_start();
  require_once "./php/connect.php";
  include('./alt/nav-bar.php');
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
  <head>
    <Title> BirCozum </Title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="UTF-8">
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="./styles/style.css">
    <link rel="stylesheet" href="./styles/popup.css">
    <link rel="stylesheet" href="./styles/select.css">
    
    <style>
      .affix {
        top: 0;
        width: 100%;
        z-index: 9999;
      }
      .affix + .container-fluid { padding-top: 70px; }
      body { position: relative; }
      #section1 { padding-top:50px;height:500px;color: #fff; background-color:#A2B9EE; }
      #section2 { padding-top:50px;height:500px;color: #fff; background-color:#A2DCEE; }
      #section3 { padding-top:50px;height:500px;color: #fff; background-color: #ADEEE2; }
    </style>
  </head>
  <body data-spy="scroll" data-target=".navbar" data-offset="50" >
    <div id="section1" class="container-fluid">
      <h1>Duyurular</h1>
  
    <div style="background-color: #4f39b3;"
	class="well"> Seyrek Mahallesi genelinde ilaçlama yapılacaktır.</div>     
    <div style="background-color: #4f39b3;" class="well">Villakent Su Kesintisi : 30.06.2023 </div>
    <div style="background-color: #4f39b3;" class="well">Seyrek Mahallesi genelinde ilaçlama yapılacaktır.</div>
    <div style="background-color: #4f39b3;" class="well">Seyrek Mahallesi genelinde ilaçlama yapılacaktır.</div>
      
      </div>
  

    <div id="section2" class="container-fluid">
      <h1>Şikayetler</h1>
      <div class="container">
        <div class="row">
          
          <div id="map" class="col-sm-6" style="background-color:#673ab7; height:30vh;"></div>
          <div class="popup-map">
					        <span class="popuptext" id="popup">Önce Haritada Belirtin </span>
				        </div>
          <script type="text/javascript" src="./scripts/map_update.js"></script>
          <script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAPcrcZR6NrwA4JXV8GjnmlW1uteZGiGgs&callback=initMap"> </script>

          <div class="col-sm-6" style="background-color:gray; height:30vh;">
            <div class="col-md-4  col-md-offset-4 maindiv">
              <div class="text-center">
                <h1 class="login">Şikayette Bulun</h1>
              </div>

              <?php
                  if(isset($_SESSION['loggedin'])){
                    echo '<form method="post" action="./php/reg_entry.php">
                    <input type="hidden" name="form_type" value="entry">
                    <select name="entry_type" required>
                      <option value="Su"> Su </option>
                      <option value="Elektrik"> Elektrik </option>
                      <option value="Hayvan"> Hayvan </option>
                      <option value="Diger"> Diğer </option>
                    </select>
                    <input name="entry_title" class="formtype" type="text" class="form-control-login" placeholder="Başlık yazınız" required pattern="[a-zA-Z].{2,80}"
                    title="Lütfen 5-40 karakter sınırlarına uyunuz">
                    <input name="entry_desc" class="formtype" type="text" class="form-control-login" placeholder="Açıklama" required>
                    <input id="lat" name="lat" class="formtype" type="hidden" class="form-control-login" required>
                    <input id="lng" name="lng" class="formtype" type="hidden" class="form-control-login" required>
                    <input id="street_entry" name="street_name_entry" class="formtype form-control-login" type="hidden" required>
                    <input type="submit" value="gönder" onclick="return check();">
                    
                  </form>';
                  }
                  else {
                    echo '<button style="color:black;" onclick="window.location.href=\'./alt/login.html\'"> Giris Yap </button>';
                  }
                ?>
              
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="section3" style="background-color:#786fb5b3;" class="container-fluid">          
      <h1>Öneriler</h1>          
      <div class="container">
        <div class="row">
          <div id="map2" class="col-sm-6" style="background-color:#673ab7; height:30vh;"></div>
          <div class="col-sm-6"  style="height:30vh;" >
            <div class="col-md-4  col-md-offset-4 maindiv"> 
              <div class="text-center">
                <h1 class="logIn">Öneride Bulun </h1>
              </div>
              <?php
                  if(isset($_SESSION['loggedin'])){
                    echo '<form method="post" action="./php/reg_entry.php">
                    <input type="hidden" name="form_type" value="advice">
                    <select name="advice_type" required>
                      <option value="Su"> Su </option>
                      <option value="Elektrik"> Elektrik </option>
                      <option value="Hayvan"> Hayvan </option>
                      <option value="Diger"> Diğer </option>
                    </select>
                    <input name="advice_title" class="formtype" type="text" class="form-control-login" placeholder="Başlık yazınız" required pattern="[a-zA-Z].{2,80}"
                    title="Lütfen 5-40 karakter sınırlarına uyunuz">
                    <input name="advice_desc" class="formtype" type="text" class="form-control-login" placeholder="Açıklama" required>
                    <input id="lat1" name="lat1" class="formtype" type="hidden" class="form-control-login" required>
                    <input id="lng1" name="lng1" class="formtype" type="hidden" class="form-control-login" required>
                    <input id="street_advice" name="street_name_advice" class="formtype form-control-login" type="hidden" required>
                    <input type="submit" value="gönder" onclick="return check();">
                    
                  </form>';
                  }
                  else {
                    echo '<button style="color:black;" onclick="window.location.href=\'./alt/login.html\'"> Giris Yap </button>';
                  }
                ?>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
    <?php   include('./alt/footer.php'); ?>
  </body>
</html>