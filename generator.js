
let background_img;
let logo;

let canvas_scale = 0.3;

const Y_AXIS = 1;
const X_AXIS = 2;

const margins = [12, 10, 12, 10];
let abs_margins;
const grid_increment = 40;
let num_cols = 4;
let col_margin = 30;

let montserrat_extrabold;
let montserrat_medium;
let industry_black_italic;
let politica_ultra;
let politica_bold;
let politica_medium;

let font_size = 100;

let headline = "SKATE CONTEST";
let subheadline = "AUGSBURG 2021";
let text_1 = "12.07.2021, 15 - 18h";
let text_2 = "FREE FOOD & DRINKS, DJ, PRIZES";
let text_3 = "Henrys Skateland - Second Street 2, 86163 Augsburg";

let default_background = "Picture 3"

let c_0;
let c_1;
let yellow_01;

let toggle_grid = false;


function grid_line(row)
{
    return (abs_margins[0] + (row * grid_increment));
}

function grid_snap(y_pos)
{
    let remainder = (int(y_pos) - abs_margins[0]) % grid_increment;
    return (int(y_pos) - remainder + (remainder > (grid_increment / 2)) * grid_increment);
}

function get_num_lines()
{
    return int((height - (abs_margins[1] + abs_margins[2])) / grid_increment);
}

function column(n)
{
    let col_width = (width - 2 * abs_margins[1]) / num_cols;
    return abs_margins[1] + n * col_width;
}

function setGradient(x, y, w, h, c1, c2, axis) 
{
    noFill();
    strokeWeight(2);
  
    if (axis === Y_AXIS) {
      // Top to bottom gradient
        for (let i = y; i <= y + h; i++) {
            let inter = map(i, y, y + h, 0, 1);
            let c = lerpColor(c1, c2, inter);
            stroke(c);
            line(x, i, x + w, i);
        }
    } else if (axis === X_AXIS) {
      // Left to right gradient
        for (let i = x; i <= x + w; i++) {
            let inter = map(i, x, x + w, 0, 1);
            let c = lerpColor(c1, c2, inter);
            stroke(c);
            line(i, y, i, y + h);
        }
    }
}

function draw_logo(x, y, target_width, origin)
{
    let target_height = logo.height * target_width / logo.width;
    if(origin === "RIGHT")
    {
        image(logo, x  - target_width, y - (target_height * 0.87), target_width, target_height , 0, 0, logo.width, logo.height);
    } else if (origin === "CENTER")
    {
        image(logo, x  - target_width/2, y - (target_height * 0.87), target_width, target_height, 0, 0, logo.width, logo.height);

    } else 
    {
        image(logo, x, y - target_height, target_width, target_height * 0.87, 0, 0, logo.width, logo.height);

    }
}

function word_wrap(str, char_limit, text_size)
{
    let split_text = str.split(" ");
    print(typeof(split_text));

    let tmp = [""];
    let char_count = 0;
    for (let i = 0; i < split_text.length; i++)
    {
        if(tmp[i].length + split_text[i].length < char_limit)
        {   
            tmp += " " + split_text[i];
        }
        else
        {
            tmp.push(split_text[i]);
        }
    }
    print(typeof(tmp))
    return tmp;
}

function wrapped_text(str, char_limit, text_size, leading, x, y)
{
    let tmp = word_wrap(str, char_limit, text_size);
    print(typeof(tmp))

    textAlign(RIGHT);
    textSize(text_size);
    for (let i = 0; i < tmp.length; i++)
    {
        text(tmp[i], x, grid_snap(y) + i * leading * grid_increment)
    }
}

function scaled_background_image(img)
{
    let din_ratio = width / height;
    if(img.width / img.height < din_ratio)
    {
        image(img, 0, 0, width, height, 0, (img.height - height * (img.width / width)) / 2, img.width, img.width * (1 / din_ratio));
    }
    else 
    {
        image(img, 0, 0, width, height, (img.width - width * (img.height / height)) / 2, 0, img.height * (din_ratio), img.height);
    }
}

function style_1()
{
    let box_y = grid_snap(height - abs_margins[3] - height * 0.24);
    
    setGradient(0, box_y, width - abs_margins[1], 8 * grid_increment , c_0, c_1, X_AXIS);

    fill(255);
    noStroke();
    textSize(font_size);

    textFont(montserrat_extrabold);
    textAlign(RIGHT);

    text(headline, width - (abs_margins[1] + 60), box_y + (3 * grid_increment));

    image(logo, width - abs_margins[1] - 60 - logo.width, box_y + (7 * grid_increment) - logo.height);
}

function style_2()
{
    let box_y = grid_snap(height * 0.4);

    setGradient(0, box_y, width, height - box_y, c_0, c_1, Y_AXIS);

    fill(255);
    noStroke();
    textSize(font_size);

    textFont(montserrat_extrabold);
    textAlign(CENTER);

    text(headline, width / 2, grid_snap(height * 0.7));

    textFont(montserrat_medium);
    textSize(font_size - font_size / 3);

    text(subheadline, width / 2, grid_snap(height * 0.7) + 3 * grid_increment);


    //image(logo, width / 2 - logo.width / 2, grid_snap(height - abs_margins[2]) - 2 * grid_increment);
    draw_logo(width / 2, grid_snap(height - abs_margins[2]) - grid_increment, 300, "CENTER");
}

function style_3()
{
    setGradient(width * 0.4, 0, width - width * 0.4, height, c_0, c_1, X_AXIS);

    let text_height = grid_snap(height * 0.35);

    fill(255);
    noStroke();
    textSize(font_size);
    textLeading(font_size);

    textFont(montserrat_extrabold);
    textAlign(RIGHT);
    //rect(width * 0.66, grid_snap(height * 0.4), width - width * 0.66 - abs_margins[1], grid_snap(height * 0.4) + 5 * grid_increment);
    text(headline, width * 0.66, text_height, width - width * 0.66 - abs_margins[1] + 20, text_height + 5 * grid_increment);
    //wrapped_text(headline, 12, textSize, 2, width * 0.66, text_height);

    textFont(montserrat_medium);
    textSize(font_size - font_size / 3);

    text(subheadline, width * 0.66, text_height + 5 * grid_increment, width - width * 0.66 - abs_margins[1] + 20, text_height + 11 * grid_increment);

    //image(logo, width - abs_margins[1] - logo.width, height - abs_margins[2] - logo.height);
    draw_logo(width - abs_margins[1], height - abs_margins[2], 400, "RIGHT");

}

function style_4()
{
    let box_y = grid_snap(height * 0.4);
    setGradient(0, box_y, width, height - box_y, c_0, c_1, Y_AXIS);

    let base_height = grid_snap(0.73 * height);

    textAlign(CENTER);
    noStroke();
    fill(yellow_01);
    textFont(industry_black_italic);
    justified_text(headline, width/2, base_height, width - (2 * abs_margins[1]) , 500, 50);

    textAlign(LEFT);
    fill(255);
    textFont(politica_ultra);

    let text_1_height = justified_text(text_1, column(0), base_height + 5 * grid_increment, column(3) - column(0) - (col_margin / 2));
    let text_2_height = justified_text(text_2, column(0), base_height + 7 * grid_increment, column(3) - column(0) - (col_margin / 2));

    textFont(politica_medium);

    let text_3_height = justified_text(text_3, column(0), base_height + 9 * grid_increment, column(3) - column(0) - (col_margin / 2));
}

function show_grid()
{
    for(let i = 0; i < 200; i++)
    {
        let y_height = grid_line(i);

        if(y_height < height - abs_margins[2]){
            line(abs_margins[3], y_height, width - abs_margins[1], y_height);
        }
    }
}

function show_columns()
{
    for(let i = 0; i < num_cols + 1; i++)
    {
        let x = column(i);
        line(x, abs_margins[0], x, height - abs_margins[0]);
    }
}

function change_background()
{
    let select = document.getElementById('select_background');
    switch (select.value)
    {
        case 'Picture 1':
            background_img = loadImage("assets/pexels-tim-mossholder-even-smaller.jpg");
            print(select.value);
            break;

        case 'Picture 2':
            background_img = loadImage("assets/vans-park-series.jpg");
            print(select.value);
            break;

        case 'Picture 3':
            background_img = loadImage("assets/pexels-jan-medium.jpg");
            print(select.value);
            break;
    }
}

function justified_text(theText, x, y, width)
{
    textSize(100);
    let fontSize = 100 * (width / textWidth(theText));
    textSize(fontSize);
    text(theText, x, y);
    return fontSize;
}

function justified_text(theText, x, y, width, max_size, min_size)
{
    textSize(100);
    let fontSize = 100 * (width / textWidth(theText));
    if(fontSize > max_size)
    {
        textSize(max_size);
        return max_size;
    } 
    else if (fontSize < min_size)
    {
        textSize(min_size);
        return min_size;
    }
    else 
    {
        textSize(fontSize);
    }
    text(theText, x, y);
    return fontSize;
}

function safe_justified_text(theText, x, y, width, max_size, min_size)
{
    textSize(100);
    let fontSize = 100 * (width / textWidth(theText));
    if(fontSize > max_size)
    {
        return false;
    } 
    else if (fontSize < min_size)
    {
        return false;
    }
    else 
    {
        textSize(fontSize);
    }
    text(theText, x, y);
    return fontSize;
}


function mousePressed()
{
    if(mouseX > 0 && mouseX < width)
    {
        if(mouseY > 0 && mouseY < height)
        {
            redraw();
        }
    }
}

function keyPressed()
{
    if(keyCode == ENTER)
    {
        redraw();
    } 
    else if(key == 'w')
    {
        toggle_grid = !toggle_grid;
        redraw();
    }

}


function preload()
{
    background_img = loadImage("assets/pexels-jan-medium.jpg");

    logo = loadImage("assets/avement_logo_white.svg");
    montserrat_extrabold = loadFont("fonts/Montserrat/Montserrat-ExtraBold.ttf");
    montserrat_medium = loadFont("fonts/Montserrat/Montserrat-Medium.ttf");
    industry_black_italic = loadFont("fonts/Industry/Industry_Black_Italic.otf");
    politica_ultra = loadFont("fonts/Politica/Politica_Ultra.otf");
    politica_bold = loadFont("fonts/Politica/Politica_Bold.otf");
    politica_medium = loadFont("fonts/Politica/Politica_Medium.otf");
} 

function setup()
{
    var canvas;
    
    
    
    if(background_img.width < background_img.height)
    {
        canvas = createCanvas(1480, 2100);
        
    } else
    {
        canvas = createCanvas(2100, 1480);
    }
    canvas.parent('workspace');
    abs_margins = [(height * margins[0]) / 100, (width * margins[1]) / 100, (height * margins[2]) / 100, (width * margins[3]) / 100];

 
    c_0 = color('rgba(0, 0, 0, 0)');
    c_1 = color('rgba(0, 0, 0, 1)');
    yellow_01 = color(246, 214, 9);

    init();
}


function draw()
{

    frameRate(5);

    print(windowHeight);

    let workspace_width = 0.7 * windowWidth;
    let workspace_height = windowHeight - 70;
    let workspace_ratio = workspace_width / workspace_height;

    if(background_img.width < background_img.height)
    {
        format_ratio = 1480 / 2100;
        resizeCanvas(1480, 2100);
    } else
    {
        format_ratio = 2100 / 1480;
        resizeCanvas(2100, 1480);
    }

    print(format_ratio);

    if(format_ratio > workspace_ratio)
    {
        resizeCanvas(workspace_width, height * (workspace_width / width));
    } else
    {
        resizeCanvas(width * (workspace_height / height), workspace_height);
    }
    

    abs_margins = [(height * margins[0]) / 100, (width * margins[1]) / 100, (height * margins[2]) / 100, (width * margins[3]) / 100];
    


    //image(background_img, width / 2 - background_img.width / 2, 0);
    background(255);
    scaled_background_image(background_img);

    print(width, height);
    print(background_img);

    
    if(subheadline == "")
    {
        style_1();
        print("1")
    } else if (height > width)
    {
        //style_2();
        style_4();
        print("2")
    } else
    {
        style_3();
        print("3")
    }

    if(toggle_grid)
    {
        stroke(255);
        show_grid();
        show_columns();
    }

}


function apply_changes()
{
    headline = document.getElementById('input_headline').value.toUpperCase();
    subheadline = document.getElementById('input_subheadline').value;
    text_1 = document.getElementById('input_text_1').value;
    text_2 = document.getElementById('input_text_2').value;
    text_3 = document.getElementById('input_text_3').value;
}

function init()
{
    document.getElementById('input_headline').value = headline;
    document.getElementById('input_subheadline').value = subheadline;
    document.getElementById('input_text_1').value = text_1;
    document.getElementById('input_text_2').value = text_2;
    document.getElementById('input_text_3').value = text_3;

    document.getElementById('apply_button').addEventListener('click', apply_changes);
    document.getElementById('select_background').addEventListener('change', change_background);
    document.getElementById('select_background').value = default_background;
}