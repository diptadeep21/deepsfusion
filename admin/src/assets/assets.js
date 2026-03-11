import p1 from './p1.png';
import p2 from './p2.png';
import p3 from './p3.png';
import p4 from './p4.png';
import p5 from './p5.png';

import b1 from './b1.png';
import b2 from './b2.png';
import b3 from './b3.png';
import b4 from './b4.png';
import b5 from './b5.png';

import s1 from './s1.png';
import s2 from './s2.png';
import s3 from './s3.png';
import s4 from './s4.png';
import s5 from './s5.png';

import c1 from './c1.png';
import c2 from './c2.png';
import c3 from './c3.png';
import c4 from './c4.png';
import c5 from './c5.png';



import logo from './logo.png'
import hero_img from './hero_img.png'
import cart_icon from './cart_icon.png'
import bin_icon from './bin_icon.png'
import dropdown_icon from './dropdown_icon.png'
import exchange_icon from './exchange_icon.png'
import profile_icon from './profile_icon.png'
import quality_icon from './quality_icon.png'
import search_icon from './search_icon.png'
import star_dull_icon from './star_dull_icon.png'
import star_icon from './star_icon.png'
import support_img from './support_img.png'
import menu_icon from './menu_icon.png'
import about_img from './about_img.png'
import contact_img from './contact_img.png'
import razorpay_logo from './razorpay_logo.png'
import stripe_logo from './stripe_logo.png'
import cross_icon from './cross_icon.png'

export const assets = {
    logo,
    hero_img,
    cart_icon,
    dropdown_icon,
    exchange_icon,
    profile_icon,
    quality_icon,
    search_icon,
    star_dull_icon,
    star_icon,
    bin_icon,
    support_img,
    menu_icon,
    about_img,
    contact_img,
    razorpay_logo,
    stripe_logo,
    cross_icon
}

export const products = [
    // Polaroids
    {
      _id: "polaroid1",
      name: "Handmade Polaroid 1",
      description: "A cute handcrafted polaroid to capture your memories.",
      price: 29,
      image: [p1, p2, p3],
      category: "Polaroid",
      date: Date.now(),
    },
    {
      _id: "polaroid2",
      name: "Handmade Polaroid 2",
      description: "A cute handcrafted polaroid to capture your memories.",
      price: 29,
      image: [p2, p1, p4],
      category: "Polaroid",
      date: Date.now(),
    },
    {
      _id: "polaroid3",
      name: "Handmade Polaroid 3",
      description: "A cute handcrafted polaroid to capture your memories.",
      price: 29,
      image: [p3, p2, p5],
      category: "Polaroid",
      date: Date.now(),
    },
    {
      _id: "polaroid4",
      name: "Handmade Polaroid 4",
      description: "A cute handcrafted polaroid to capture your memories.",
      price: 29,
      image: [p4, p3, p1],
      category: "Polaroid",
      date: Date.now(),
    },
    {
      _id: "polaroid5",
      name: "Handmade Polaroid 5",
      description: "A cute handcrafted polaroid to capture your memories.",
      price: 29,
      image: [p5, p4, p2],
      category: "Polaroid",
      date: Date.now(),
    },
  
    // Bookmarks
    {
      _id: "bookmark1",
      name: "Handmade Bookmark 1",
      description: "Elegant handmade bookmark to add charm to your reading.",
      price: 49,
      image: [b1, b2, b3],
      category: "Bookmark",
      date: Date.now(),
    },
    {
      _id: "bookmark2",
      name: "Handmade Bookmark 2",
      description: "Elegant handmade bookmark to add charm to your reading.",
      price: 49,
      image: [b2, b1, b4],
      category: "Bookmark",
      date: Date.now(),
    },
    {
      _id: "bookmark3",
      name: "Handmade Bookmark 3",
      description: "Elegant handmade bookmark to add charm to your reading.",
      price: 49,
      image: [b3, b2, b5],
      category: "Bookmark",
      date: Date.now(),
    },
    {
      _id: "bookmark4",
      name: "Handmade Bookmark 4",
      description: "Elegant handmade bookmark to add charm to your reading.",
      price: 49,
      image: [b4, b3, b1],
      category: "Bookmark",
      date: Date.now(),
    },
    {
      _id: "bookmark5",
      name: "Handmade Bookmark 5",
      description: "Elegant handmade bookmark to add charm to your reading.",
      price: 49,
      image: [b5, b4, b2],
      category: "Bookmark",
      date: Date.now(),
    },
  
    // Eye Sketches
    {
      _id: "sketch1",
      name: "Eye Sketch 1",
      description: "Intricately detailed eye sketch on premium paper.",
      price: 299,
      image: [s1, s2, s3],
      category: "Sketch",
      date: Date.now(),
    },
    {
      _id: "sketch2",
      name: "Eye Sketch 2",
      description: "Intricately detailed eye sketch on premium paper.",
      price: 299,
      image: [s2, s1, s4],
      category: "Sketch",
      date: Date.now(),
    },
    {
      _id: "sketch3",
      name: "Eye Sketch 3",
      description: "Intricately detailed eye sketch on premium paper.",
      price: 299,
      image: [s3, s2, s5],
      category: "Sketch",
      date: Date.now(),
    },
    {
      _id: "sketch4",
      name: "Eye Sketch 4",
      description: "Intricately detailed eye sketch on premium paper.",
      price: 299,
      image: [s4, s3, s1],
      category: "Sketch",
      date: Date.now(),
    },
    {
      _id: "sketch5",
      name: "Eye Sketch 5",
      description: "Intricately detailed eye sketch on premium paper.",
      price: 299,
      image: [s5, s4, s2],
      category: "Sketch",
      date: Date.now(),
    },
  
    // Canvases
    {
      _id: "canvas1",
      name: "Canvas Painting 1",
      description: "Vibrant hand-painted canvas, perfect for wall decor.",
      price: 499,
      image: [c1, c2, c3],
      category: "Canvas",
      date: Date.now(),
    },
    {
      _id: "canvas2",
      name: "Canvas Painting 2",
      description: "Vibrant hand-painted canvas, perfect for wall decor.",
      price: 499,
      image: [c2, c1, c4],
      category: "Canvas",
      date: Date.now(),
    },
    {
      _id: "canvas3",
      name: "Canvas Painting 3",
      description: "Vibrant hand-painted canvas, perfect for wall decor.",
      price: 499,
      image: [c3, c2, c5],
      category: "Canvas",
      date: Date.now(),
    },
    {
      _id: "canvas4",
      name: "Canvas Painting 4",
      description: "Vibrant hand-painted canvas, perfect for wall decor.",
      price: 499,
      image: [c4, c3, c1],
      category: "Canvas",
      date: Date.now(),
    },
    {
      _id: "canvas5",
      name: "Canvas Painting 5",
      description: "Vibrant hand-painted canvas, perfect for wall decor.",
      price: 499,
      image: [c5, c4, c2],
      category: "Canvas",
      date: Date.now(),
    },
  ];