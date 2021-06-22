
let background_img;
let logo;
let logo_black;
let logo_2;

const Y_AXIS = 1;
const X_AXIS = 2;

let margins;
let abs_margins;
let grid_increment;
let num_cols;
let col_margin;
let col_width;

let montserrat_extrabold;
let montserrat_medium;
let industry_black_italic;
let politica_ultra;
let politica_bold;
let politica_medium;

let font_size;

let vans_logo = [];
let thrasher_logo = [];
let bones_logo = [];
let titus_logo = [];

let default_background = "Picture 3"

let layouts = [];
let current_layout = 2;


let format = 1;
let canvas_scale = 0.9;

let dark_layout = false;

let c_0;
let c_1;
let yellow_01;
let red_01;

let toggle_grid = false;

class Layout
{
    constructor(name, attributes,  num_text_fields, text_field_names, default_text, layout_function)
    {
        this.name = name;
        this.attributes = attributes;
        this.draw_function = layout_function;
        this.num_text_fields = num_text_fields;
        this.text_field_names = text_field_names;
        this.default_text = default_text;
    }

    draw()
    {
        this.draw_function();
    }
}


function grid_line(row)
{
    return (abs_margins[0] + (row * grid_increment));
}

function grid_snap(y_pos)
{
    let remainder = (Math.round(y_pos) - abs_margins[0]) % grid_increment;
    return (Math.round(y_pos) - remainder + (remainder > (grid_increment / 2)) * grid_increment);
}

function get_num_lines()
{
    return int((height - (abs_margins[1] + abs_margins[2])) / grid_increment);
}

function column(n)
{
    
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

function draw_logo(x, y, target_width, h_align)
{
    let target_height = logo.height * target_width / logo.width;
    if(h_align === "RIGHT")
    {
        image(logo, x  - target_width, y - (target_height * 0.87), target_width, target_height , 0, 0, logo.width, logo.height);
    } else if (h_align === "CENTER")
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

function vertical_layout_1()
{
    let workspace_width = 0.7 * windowWidth;
    let workspace_height = windowHeight - 70;
    
    resizeCanvas(1480, 2100);
    resizeCanvas(canvas_scale * width * (workspace_height / height), canvas_scale * workspace_height);

    // adjusting global layout parameters
    margins = [10, 10, 10, 10];
    num_cols = 4;
    abs_margins = [(height * margins[0]) / 100, (width * margins[1]) / 100, (height * margins[2]) / 100, (width * margins[3]) / 100];
    grid_increment = height / 50;
    col_margin = width / 20;
    font_size = height / 25;
    col_width = (width - 2 * abs_margins[1]) / num_cols;

    // placing the background image
    scaled_background_image(background_img);

    // creating bottom gradient
    let box_y = grid_snap(height * 0.4);
    setGradient(0, box_y, width, height - box_y, c_0, c_1, Y_AXIS);

    let base_height = grid_increment * 36;

    // placing the headline
    textAlign(CENTER);
    noStroke();
    fill(yellow_01);
    textFont(industry_black_italic);
    justified_text(this.default_text[0].toUpperCase(), width/2, abs_margins[0], width - (2 * abs_margins[1]) , 500, 50, 'TOP');

    // creating the three lines of text
    textAlign(LEFT);
    fill(255);
    textFont(politica_ultra);

    let text_1_height = justified_text(this.default_text[2].toUpperCase(), 
                                       column(0), 
                                       base_height + 5 * grid_increment, 
                                       column(3) - column(0) - (col_margin / 2), 
                                       2.1 * font_size, 
                                       0.5 * font_size);
    let text_2_height = justified_text(this.default_text[3].toUpperCase(), 
                                       column(0), 
                                       base_height + 7 * grid_increment, 
                                       column(3) - column(0) - (col_margin / 2));

    textFont(politica_medium);

    let text_3_height = justified_text(this.default_text[4], 
                                       column(0), 
                                       base_height + 9 * grid_increment, 
                                       column(3) - column(0) - (col_margin / 2));

    // placing the logo
    push()
    translate(column(3), base_height + 5 * grid_increment - 0.75 * text_1_height);
    let scale_factor = (4 * grid_increment + 0.75 * text_1_height) / logo_2.height
    scale(scale_factor);
    image(logo_2, (col_width - (logo_2.width * scale_factor)) / scale_factor, 0);
    pop();    
}

function vertical_layout_2()
{
    let workspace_width = 0.7 * windowWidth;
    let workspace_height = windowHeight - 70;

    resizeCanvas(1480, 2100);
    resizeCanvas(canvas_scale * width * (workspace_height / height), canvas_scale * workspace_height);
    // adjusting global layout parameters
    margins = [2.5, 2.5, 2.5, 2.5];
    num_cols = 4;
    abs_margins = [(height * margins[0]) / 100, (height * margins[0]) / 100, (height * margins[2]) / 100, (height * margins[0]) / 100];
    grid_increment = 0.025 * height;
    col_margin = 0;
    font_size = height / 25;
    col_width = (width - 2 * abs_margins[1]) / num_cols;

    // setting the background color
    background(255);

    // placing the image
    let inner_width = width - 2 * abs_margins[0];
    let inner_height = height - 2 * abs_margins[0];
    let t_image_width = 0.8 * inner_width;
    let t_image_height = 0.70 * inner_height;
    let t_image_ratio = t_image_width / t_image_height;

    let headline_space = abs_margins[1] + 0.2 * inner_width;

    if(background_img.height / background_img.width > 1)
    {
    image(background_img, 
          headline_space, abs_margins[0], 
          t_image_width, t_image_height, 
          0, 
          0, 
          background_img.width, 
          background_img.width / t_image_ratio);
    }
    else
    {
        image(background_img, 
            headline_space, abs_margins[0], 
            t_image_width, t_image_height, 
            0, 
            0, 
            background_img.height *  t_image_ratio, 
            background_img.height); 
    }

    draw_logo(inner_width, 2*abs_margins[0] + 0.8 * logo.height, 0.23 * width, "RIGHT");

    push();
    translate(0, height);
    rotate(-0.5 * PI);

    textAlign(RIGHT);
    noStroke();
    fill(red_01);
    textFont(industry_black_italic);

    justified_text(this.default_text[0].toUpperCase(), 
                   inner_height + 0.5 * abs_margins[0], 
                   abs_margins[0] + 0.15  * inner_width, 
                   inner_height , 
                   inner_width - t_image_width - abs_margins[0],
                   50, 
                   'MID');

    //  rect(abs_margins[0], abs_margins[1] + 0.083 * inner_width - 0.02 * width, height - 3 * abs_margins[0] - headline_length, 0.04 * width)
    pop();

    textAlign(LEFT);
    fill(0);
    textFont(politica_ultra);

    let base_height = 1.5 * abs_margins[0] + t_image_height;
    let height_increment = 0;
    let spacing = 0.4 * abs_margins[0]
    let text_1_height = justified_text(this.default_text[1].toUpperCase(), 
                                       headline_space, 
                                       base_height + height_increment, 
                                       inner_width - headline_space + abs_margins[1], 
                                       1.5 * font_size, 
                                       0.5 * font_size, 
                                       'TOP');
    height_increment += text_1_height + 0.3 * abs_margins[0];
    let text_2_height = justified_text(this.default_text[2].toUpperCase(), 
                                       headline_space, 
                                       base_height + height_increment, 
                                       inner_width - headline_space + abs_margins[1], 
                                       1.0 * font_size, 
                                       0.5 * font_size, 
                                       'TOP');
    height_increment += text_2_height + spacing;

    textFont(politica_bold);

    let text_3_height = justified_text(this.default_text[3], 
                                       headline_space, 
                                       base_height + height_increment, 
                                       inner_width - headline_space + abs_margins[1], 
                                       0.6 * font_size, 
                                       0.3 * font_size, 
                                       'TOP');

    height_increment += text_3_height + spacing;

    let text_4_height = justified_text(this.default_text[4], 
                                       headline_space, 
                                       base_height + height_increment, 
                                       inner_width - headline_space + abs_margins[1], 
                                       0.6 * font_size, 
                                       0.3 * font_size, 
                                       'TOP');

    height_increment += text_4_height + spacing;

    let text_5_height = justified_text(this.default_text[5], 
                                       headline_space, 
                                       base_height + height_increment, 
                                       inner_width - headline_space + abs_margins[1], 
                                       0.6 * font_size, 
                                       0.3 * font_size, 
                                       'TOP');

    
    justified_images([logo_black, thrasher_logo[0], bones_logo[0], titus_logo[0], vans_logo[0 ]], 
                     headline_space, 
                     height - abs_margins[0],
                     inner_width - headline_space + abs_margins[1], 
                     1,
                     'BOTTOM'
                     ) 


}

function square_layout_1()
{
    let workspace_width = 0.7 * windowWidth;
    let workspace_height = windowHeight - 70;
    
    resizeCanvas(1000, 1000);
    resizeCanvas(canvas_scale * width * (workspace_height / height), canvas_scale * workspace_height);

    // adjusting global layout parameters
    margins = [10, 10, 10, 10];
    abs_margins = [(height * margins[0]) / 100, (width * margins[1]) / 100, (height * margins[2]) / 100, (width * margins[3]) / 100];
    grid_increment = height / 50;
    font_size = height / 25;

    // placing the background image
    scaled_background_image(background_img);

    // creating bottom gradient
    let box_y = height * 0.4;
    setGradient(0, box_y, width, height - box_y, c_0, c_1, Y_AXIS);

    // placing the headline
    textAlign(LEFT);
    noStroke();
    fill(yellow_01);
    textFont(industry_black_italic);
    justified_text(this.default_text[0], abs_margins[1], 0.7 * height, width - (2 * abs_margins[1]) , 7 * font_size, 0.5 * font_size, 'BOTTOM');

    textAlign(LEFT);
    fill(255);
    textFont(politica_bold);
    justified_text(this.default_text[1], abs_margins[1], 0.7 * height + 0.01 * height, width - (2 * abs_margins[1]), 1.7 * font_size, 1* font_size, 'TOP' )
    // creating the three lines of text
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

function change_current_picture()
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

function picture_brightness()
{

}

function justified_text(theText, x, y, width, h_align = '')
{
    textSize(100);
    let fontSize = 100 * (width / textWidth(theText));
    textSize(fontSize);
    if(h_align == 'TOP')
    {
        text(theText, x, y + fontSize);
    }
    else if (h_align == 'MID')
    {
        text(theText, x, y + 0.5 * fontSize);
    }
    else 
    {
        text(theText, x, y);
    }
    return fontSize;
}

function justified_text(theText, x, y, width, max_size, min_size, h_align = '')
{
    textSize(100);
    let fontSize = 100 * (width / textWidth(theText));
    if(fontSize > max_size)
    {
        fontSize = max_size;
        textSize(max_size);
    } 
    else if (fontSize < min_size)
    {
        fontSize = min_size;
        textSize(min_size);
    }
    else 
    {
        textSize(fontSize);
    }
    if(h_align == 'TOP')
    {
        text(theText, x, y + 0.9 * fontSize);
    }
    else 
    {
        text(theText, x, y);
    }
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

function justified_images(images, x, y, t_width, scale, v_align)
{
    let image_scales = [];
    for (let i = 0; i < images.length; i++)
    {
        image_scales[i] = (1 / sqrt(images[i].width * images[i].height)) * 70
    }
    
    let image_width = 0;
    for (let i = 0; i < images.length; i++)
    {
        image_width += scale * 0.001 * width * image_scales[i] * images[i].width;
    }
    let spacing = (t_width - image_width) / (images.length - 1);
    let x_increment = x;


    for(let i = 0; i < images.length; i++)
    {
        image(images[i], 
              x_increment, 
              y - (v_align == 'BOTTOM') * scale * 0.001 * width * image_scales[i] * images[i].height, 
              scale * 0.001 * width * image_scales[i] * images[i].width, 
              scale * 0.001 * width * image_scales[i] * images[i].height);
              
        x_increment += scale * 0.001 * width * image_scales[i] * images[i].width + spacing;
    }
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
        apply_changes();
        redraw();
    } 
    else if(key == 'w')
    {
        toggle_grid = !toggle_grid;
        redraw();
    }

}

function set_layout(name)
{
    for(let i = 0; i < layouts.length; i++)
    {
        if(layouts[i].name == name)
        {
            current_layout = i;
            break;
        }
    }
    set_text_input();
}

function get_layouts_by_attribute(attribute)
{
    let tmp = [];
    
    for(let i = 0; i < layouts.length; i++)
    {
        if(layouts[i].attributes.includes(attribute))
        {
            tmp.push(layouts[i].name);
        }
    }
    return tmp;
}

function get_layouts_by_attributes(attributes)
{
    let tmp = [];
    
    if(attributes[0] == null)
    {
        return;
    }
    
    for(let i = 0; i < layouts.length; i++)
    {
        let match = true;
        for(let j = 0; j < attributes.lenth; j++)
        {
            if(!layouts[i].attributes.includes(attributes[j]))
            {
                match = false;
            }
        }
        if(match)
        {
            tmp.push(layouts[i].name);
        }
    }
    return tmp;
}

function set_format(width, height)
{
    if(width != 0 && height != 0)
    {
        format = width / height;    
    }
}

function suggest_format(usecase)
{
    switch (usecase.toLowerCase())
    {
        case 'poster':
            return ['DIN A1 Poster', 'DIN A2 Poster', 'DIN A3 Poster', 'DIN A4 Poster'];

        case 'instagram':
            return ['Square'];

        case 'events':
            return ['DIN A1 Poster', 'Square', 'DIN A2 Poster', 'DIN A3 Poster', 'DIN A4 Poster'];

        case 'banner':
            return ['Banner'];

    }
}


function preload()
{
    background_img = loadImage("assets/pexels-jan-medium.jpg");

    logo = loadImage("assets/avement_logo_white.svg");
    logo_black = loadImage("assets/avement_logo_black.svg");
    logo_2 = loadImage("assets/avement_logo_white_2.svg");
    montserrat_extrabold = loadFont("fonts/Montserrat/Montserrat-ExtraBold.ttf");
    montserrat_medium = loadFont("fonts/Montserrat/Montserrat-Medium.ttf");
    industry_black_italic = loadFont("fonts/Industry/Industry_Black_Italic.otf");
    politica_ultra = loadFont("fonts/Politica/Politica_Ultra.otf");
    politica_bold = loadFont("fonts/Politica/Politica_Bold.otf");
    politica_medium = loadFont("fonts/Politica/Politica_Medium.otf");

    vans_logo.push(loadImage('assets/logos/vans_logo_white.png'));
    vans_logo.push(loadImage('assets/logos/vans_logo_black.png'));
    bones_logo.push(loadImage('assets/logos/bones_logo_white.png'));
    bones_logo.push(loadImage('assets/logos/bones_logo_black.png'));
    titus_logo.push(loadImage('assets/logos/titus_logo_white_2.png'));
    titus_logo.push(loadImage('assets/logos/titus_logo_black_2.png'));
    thrasher_logo.push(loadImage('assets/logos/thrasher_logo_white.png'));
    thrasher_logo.push(loadImage('assets/logos/thrasher_logo_black.png'));
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

 
    c_0 = color('rgba(0, 0, 0, 0)');
    c_1 = color('rgba(0, 0, 0, 1)');
    yellow_01 = color(246, 214, 9);
    red_01 = color(210, 59, 59);

    layouts.push(new Layout('din_poster_vertical_1', 
                            ['poster', 'vertical', 'event'], 
                            5, 
                            ['Headline', 'Subheadline', 'Text 1', 'Text 2', 'Text 3'],
                            ['SKATE CONTEST', 'AUGSBURG 2021', '12.07.2021, 15 - 18h', 'FREE FOOD & DRINKS, DJ, PRIZES', 'Henrys Skateland - Second Street 2, 86163 Augsburg'],
                            vertical_layout_1));
    layouts.push(new Layout('din_poster_vertical_2', 
                            ['poster', 'vertical', 'event'], 
                            6, 
                            ['Headline', 'Text 1', 'Text 2', 'Text 3', 'Text 4', 'Text 5'],
                            ['SKATE CONTEST 2021', '12.07.2021, 15 - 18h', 'FREE FOOD & DRINKS, DJ, PRIZES', 'Henrys Skateland - Second Street 2, 86163 Augsburg', 'Riders Confirmed: Matt Hoffman - Enarson - Matthias Danidos', 'Highest Ollie:200€ / Best Trick:200€ / Vert Ramp Contest:500€'],
                            vertical_layout_2));
    layouts.push(new Layout('instagram_ad_1', 
                            ['instagram', 'vertical', 'horizontal'], 
                            2, 
                            ['Headline', 'Subheadline'],
                            ['SKATE CONTEST', 'AUGSBURG 2021'],
                            square_layout_1));

    init();

    set_text_input();
}


function draw()
{
    let workspace_width = 0.7 * windowWidth;
    let workspace_height = windowHeight - 70;

    let tmp_width = 1480;
    let tmp_height = 2100;
    target_area = (canvas_scale * tmp_width * (workspace_height / tmp_height)) * (canvas_scale * workspace_height);

    let scaled_width = sqrt(target_area * format);
    let scaled_height = scaled_width / format;

    frameRate(10);
    layouts[current_layout].draw();
}


function apply_changes()
{
    //pushes the text from the input boxes into the layout

    /*
    headline = document.getElementById('input_headline').value.toUpperCase();
    subheadline = document.getElementById('input_subheadline').value;
    text_1 = document.getElementById('input_text_1').value;
    text_2 = document.getElementById('input_text_2').value;
    text_3 = document.getElementById('input_text_3').value;
    */

    let text_input_form = document.getElementById('text_input_form');
    
    let children = text_input_form.children;

    for(let i = 0; i < layouts[current_layout].num_text_fields; i++)
    {
        layouts[current_layout].default_text[i] = children[i].value;
    }
}

function set_text_input()
{
    //creates text input boxes in the sidebar according to how many the current layout requires
    let text_input_form = document.getElementById('text_input_form');
    
    let children = text_input_form.children;

    while(children[0])
    {
        children[0].remove();
    }
    
    for(let i = 0; i < layouts[current_layout].num_text_fields; i++) 
    {
        let new_input = document.createElement('input');
        new_input.setAttribute('id', layouts[current_layout].text_field_names[i]);
        new_input.value = layouts[current_layout].default_text[i];
        text_input_form.appendChild(new_input);
    };

    let apply_button = document.createElement('input');
    apply_button.setAttribute('id', 'apply_button');
    apply_button.setAttribute('type', 'button');
    apply_button.setAttribute('value', 'Apply');
    apply_button.addEventListener('click', apply_changes)
    text_input_form.appendChild(apply_button);
}

function filter_layouts()
{
    print('changed layouts');   
    let format_form = document.getElementById('suggested_formats');
    let children = format_form.children;

    while(children[0])
    {
        children[0].remove();
    }

    let suggestions = suggest_format(this.getAttribute('value'));

    for(let i = 0; i < suggestions.length; i++) 
    {
        let new_button = document.createElement('button');
        new_button.setAttribute('id', suggestions[i]);
        new_button.value = suggestions[i];
        format_form.appendChild(new_button);
    };
}

function init()
{

    document.getElementById('apply_button').addEventListener('click', apply_changes);
    document.getElementById('select_background').addEventListener('change', change_current_picture);
    document.getElementById('select_background').value = default_background;

    document.getElementById('select_layout').addEventListener('change', function(){ set_layout(this.value); });
    
    //let usecase_form_elements = document.getElementsByClassName("usecase_select");
    let usecase_form_elements = document.querySelectorAll('#usecase .container')
    for(let i = 0; i < usecase_form_elements.length; i++)
    {
        usecase_form_elements[i].addEventListener('click', filter_layouts);
    } 

    let format_inputs = document.querySelectorAll('#format_input_form input')

    for(let i = 0; i < format_inputs.length; i++)
    {
        format_inputs[i].addEventListener('change', () => { set_format(format_inputs[0].value, format_inputs[1].value); })
    }

    document.getElementById('select_orientation').addEventListener('change', () => {
        let tmp = format_inputs[0].value;
        format_inputs[0].value = format_inputs[1].value;
        format_inputs[1].value = tmp;
    })
}