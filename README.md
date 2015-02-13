#Bootstrap Input Spinner 

***

Enhance a text input for entering numeric values, with up/down buttons


## Installation

#### HTML HEAD:
```
  <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css"/>
  <script src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
  <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>
  <script src="input-spinner.js"></script>	
  <link rel="stylesheet" href="style.css"/>

```

#### JavaScript:
```
<script type="text/javascript">
        $(function () {
            $("#spin").spinner({decimals:2,step:0.5});
        });
</script>
```

#### HTML BODY:
```
<form method="post" >
<input type="text" id="spin"/>
</form>
```

<p>And you are done!</p>