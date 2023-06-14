<?php
  session_start();
  include('../alt/nav-bar.php');
?>
<!DOCTYPE html>
<html>
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="UTF-8">
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link rel="stylesheet" href="../styles/style.css">
    <link rel="stylesheet" href="../styles/popup.css">
    <link rel="stylesheet" href="../styles/select.css">
    <link rel="stylesheet" href="../styles/sikayetler.css">

    </head>

    <body>
        <div class="header">
            <h2>Şikayetler</h2>
        </div>
        
        <div class="leftColIn">
          <div class="card">
            <h4>
            <span id="entries" class="entry_type"><i class="glyphicon glyphicon-triangle-bottom"></i>Toplam şikayet sayısı</span>
            <span id="su-entry" class="entry_type"><i class="glyphicon glyphicon-triangle-bottom"></i>Su şikayetleri</span>
            <span id="elektrik-entry" class="entry_type"><i class="glyphicon glyphicon-triangle-bottom"></i>Elektrik şikayetleri</span>
            <span id="hayvan-entry" class="entry_type"><i class="glyphicon glyphicon-triangle-bottom"></i>Hayvan şikayetleri</span>
            <span id="diger-entry" class="entry_type"><i class="glyphicon glyphicon-triangle-bottom"></i>Diğer şikayetler</span>
            </h3>
          </div>
        </div>
        <div class="row">
            <div id="leftcol" class="leftcolumn">
              <div id="leftColIn" class="leftColIn" style="margin-left:15px;">
              </div>
            </div>
            <div class="rightcolumn">
                <div class="card">
                    <div id="map3" style="background-color:#673ab7; height:70vh;"></div>
                    <script type="text/javascript" src="../scripts/sikayetler.js"></script>
                    <script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAPcrcZR6NrwA4JXV8GjnmlW1uteZGiGgs&callback=initMap"> </script>
                </div>
            </div>
          </div>
          <?php   include('../alt/footer.php'); ?>
    </body>
</html>