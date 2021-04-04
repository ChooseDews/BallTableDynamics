// App.vue

<template>
 

<div class="container">

    <h1>Ball Table Dynamics</h1>
    <p class="author">John Dews-Flick <br> April, 2021</p>


    <h2>Tethered on a Frictionless Table</h2>
    <Stage></Stage>

    <h3>Derivation</h3>

    <p>

        We define two coorinate systems. The global coordinates as shown above \(\{\hat{X},\hat{Y},\hat{Z} \} \) and the rotating coordinates \( \{\hat{r},\hat{\theta},\hat{Z}\} \). See <a href="https://en.wikipedia.org/wiki/Rotating_reference_frame#Time_derivatives_in_the_two_frames" target="_blank">rotating reference frames</a> for use of the transport theorem.
         
        
        
        $$ \vec{r_1}=r\hat{r} $$
        $$ \vec{v_1}=\frac{\mathrm{d}\vec{r_1} }{\mathrm{d} t} = \dot{r}\hat{r} + \dot\theta\hat{Z} \times r\hat{r} = \dot{r}\hat{r} + r\dot\theta\hat\theta  $$
        $$ \vec{a_1}=\frac{\mathrm{d}\vec{v_1} }{\mathrm{d} t} =  \ddot{r}\hat{r} + r\ddot\theta\hat\theta + \dot{r}\dot\theta\hat\theta  + \dot\theta\hat{Z} \times (\dot{r}\hat{r} + r\dot\theta\hat\theta) $$
        $$ \vec{a_1}= (\ddot{r}-\dot\theta^2 r)\hat{r} + (\ddot\theta r +2\dot\theta\dot r) \hat\theta $$


        $$ \vec{F_1}=m_1 \vec{a_1} $$
        $$ \vec{F_1}=T(-\hat{r}) = m_1(\ddot{r}-\dot\theta^2 r)\hat{r} + m_1(\ddot\theta r +2\dot\theta\dot r) \hat\theta$$

        $$ \vec{r_2}=-(L-r)\hat{Z} $$
        $$ \vec{v_2}= \dot{r}\hat{Z} $$
        $$ \vec{a_2}= \ddot{r}\hat{Z} $$
        $$ \vec{F_2}= (T-m_{2}g)\hat{Z} = m_2 \vec{a_2} = m_2\ddot{r}\hat{Z} $$
        $$ T = m_2\ddot{r} + m_{2}g $$

        In many problem the tension T is taken as a constant. Thus the motion of the hanging weight is neglected, sometimes called the "Inertial force" in this case the term \( m_2\ddot{r} \). This is an acceptable assumption if the radius \( (r) \) does not change.

        $$ -(m_2\ddot{r} + m_{2}g)\hat{r} = m_1(\ddot{r}-\dot\theta^2 r)\hat{r} + m_1(\ddot\theta r +2\dot\theta\dot r) \hat\theta$$
        $$ -(m_2\ddot{r} + m_{2}g) = m_1(\ddot{r}-\dot\theta^2 r) $$
        $$ -m_{2}g + m_1\dot\theta^2 r  = (m_1+m_2)\ddot{r} $$


    </p>
    <h5>The system of ODE's are</h5>
    <p>
        $$ \ddot{r} = \frac{ -m_{2}g + m_1\dot\theta^2 r}{(m_1+m_2)} $$
        $$ m_1(\ddot\theta r +2\dot\theta\dot r) = 0 $$
        

    </p>
    <h5>This can be converted to a system of first order equations</h5>

    <p>
        $$ y_1=r \qquad y_2=\dot{r} \qquad y_3=\theta \qquad y_4=\dot\theta $$

        $$\dot{y_1}=y_2 $$
        $$\dot{y_2}=\frac{-\frac{m_2}{m_1}g+\dot\theta^2 r}{1+\frac{m_2}{m_1}} $$
        $$\dot{y_3}=y_4 $$
        $$\dot{y_4}=\frac{-2y_{4}y_{2}}{y{1}} $$

        Note the system depends only on the ratios of the two masses. The value g is the gravitational constant. 


    </p>





        <h2>Tethered on a Table with Friction</h2>

        <p>Friction is a inevitable loss of energy within the system associated with almost all real processes; it may be noted friction is a disperson of energy in the form of heat and deformation. In the case presented three forms of friction are present, the rolling friction, the rope bearing friction, and air resistance; of which only the first will be considered. The rolling friction (or sliding friction) is always opposite to the direction of motion and is porportional to the normal force. </p>

        <h3>Friction Derivation</h3>

        $$ \hat{v} = \frac{\vec{v_1}}{|\vec{v_1}|} = \frac{\dot{r}\hat{r} + r\dot\theta\hat\theta}{\sqrt{\dot{r}^2 + {(r\dot\theta)}^2 }} $$

        $$F_{friction} = \mu m_{1}g(-\hat{v})$$

        <p>The unit vector \(\hat{v}\) represents the direction of motion, found by taking the unit vector of \(\vec{v_1}\). Friction is the normal force times the friction coeffiecent \(\mu\) opposing the direction of motion  \((-\hat{v})\). 


            
        </p>

        $$ \vec{F_1}= -\mu m_{1}g\hat{v} + -T\hat{r} = m_1(\ddot{r}-\dot\theta^2 r)\hat{r} + m_1(\ddot\theta r +2\dot\theta\dot r) \hat\theta$$
        $$ -\mu m_{1}g{\frac{\dot{r}\hat{r} + r\dot\theta\hat\theta}{\sqrt{\dot{r}^2 + {(r\dot\theta)}^2 }}} + -T\hat{r} = m_1(\ddot{r}-\dot\theta^2 r)\hat{r} + m_1(\ddot\theta r +2\dot\theta\dot r) \hat\theta$$


        $$ -\mu m_{1}g{\frac{\dot{r}}{\sqrt{\dot{r}^2 + {(r\dot\theta)}^2 }}} -T = m_1(\ddot{r}-\dot\theta^2 r) $$

    <h5>The system of ODE's are</h5>

        $$ -\mu m_{1}g{\frac{\dot{r}}{\sqrt{\dot{r}^2 + {(r\dot\theta)}^2 }}} - m_2\ddot{r} - m_{2}g = m_1(\ddot{r}-\dot\theta^2 r) $$

        $$ -\mu m_{1}g{\frac{ r\dot\theta}{\sqrt{\dot{r}^2 + {(r\dot\theta)}^2 }}}  = m_1(\ddot\theta r +2\dot\theta\dot r) $$

    <h5>This can be converted to a system of first order equations</h5>


        $$ -\mu g{\frac{\dot{r}}{\sqrt{\dot{r}^2 + {(r\dot\theta)}^2 }}} - \frac{m_2}{m_1}g + \dot\theta^2 r = \ddot{r} + \frac{m_2}{m_1}\ddot{r}  = (1 + \frac{m_2}{m_1})\ddot{r}$$

        $$ -\mu g{\frac{ r\dot\theta}{\sqrt{\dot{r}^2 + {(r\dot\theta)}^2 }}} - 2\dot\theta\dot r  = r\ddot\theta $$


    <StageF></StageF>


</div>






</template>

<script>
import Vue from "vue";
import Stage from './Stage.vue';
import StageF from './StageFriction.vue';

export default Vue.extend({
  data() {
    return {
      bundler: "Parcel"
    };
  },
  components: {Stage, StageF}
});
</script>

<style lang="scss" scoped>
.container {



}
</style>