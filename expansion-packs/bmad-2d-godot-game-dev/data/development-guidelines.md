# Game Development Guidelines (Godot - GDScript & C#)

## Overview

This document establishes coding standards, architectural patterns, and development practices for 2D game development using Godot with GDScript and C#. These guidelines ensure consistency, performance, and maintainability across all game development stories.

## Language Selection

### When to Use GDScript
- Rapid prototyping and iteration
- Simple game logic and scripting
- Godot-specific features and integrations
- Smaller projects or game jam entries

### When to Use C#
- Performance-critical systems
- Complex algorithms and data structures
- Large-scale projects requiring strong typing
- When team has existing C# expertise

## GDScript Standards

### Naming Conventions

**Classes and Scripts:**
- PascalCase for class names: `class_name PlayerController`
- snake_case for script files: `player_controller.gd`
- One class per file, filename matches class name in snake_case

**Functions and Variables:**
- snake_case for functions: `calculate_damage()`, `apply_force()`
- snake_case for variables: `player_health`, `movement_speed`
- UPPER_SNAKE_CASE for constants: `MAX_HEALTH`, `GRAVITY`
- Prefix private members with underscore: `_internal_state`, `_process_input()`

**Signals:**
- snake_case for signal names: `signal health_changed(new_health)`
- Past tense for completed events: `signal item_collected`
- Present/continuous for states: `signal is_falling`

### Code Style

```gdscript
extends CharacterBody2D
class_name Player

# Constants
const MAX_SPEED: float = 300.0
const JUMP_VELOCITY: float = -400.0

# Exported variables (shown in Inspector)
@export var health: int = 100
@export var acceleration: float = 10.0

# Private variables
var _current_state: String = "idle"
var _velocity: Vector2 = Vector2.ZERO

# Signals
signal health_changed(new_health: int)
signal player_died()

func _ready() -> void:
    # Initialize on scene ready
    _setup_player()

func _physics_process(delta: float) -> void:
    # Handle physics updates
    _handle_movement(delta)
    move_and_slide()

func take_damage(amount: int) -> void:
    health -= amount
    health_changed.emit(health)
    if health <= 0:
        _die()

func _die() -> void:
    player_died.emit()
    queue_free()

func _handle_movement(delta: float) -> void:
    # Movement logic here
    pass
```

## C# Standards (Godot C#)

### Naming Conventions

**Classes and Files:**
- PascalCase for classes: `PlayerController`
- PascalCase for C# files: `PlayerController.cs`
- Inherit from appropriate Godot class

**Properties and Methods:**
- PascalCase for public members: `Health`, `TakeDamage()`
- camelCase with underscore for private fields: `_currentHealth`
- PascalCase for properties: `public int MaxHealth { get; set; }`

### Code Style

```csharp
using Godot;

public partial class Player : CharacterBody2D
{
    // Constants
    private const float MaxSpeed = 300.0f;
    private const float JumpVelocity = -400.0f;
    
    // Exported properties (shown in Inspector)
    [Export] public int Health { get; set; } = 100;
    [Export] public float Acceleration { get; set; } = 10.0f;
    
    // Signals
    [Signal]
    public delegate void HealthChangedEventHandler(int newHealth);
    
    [Signal]
    public delegate void PlayerDiedEventHandler();
    
    // Private fields
    private string _currentState = "idle";
    
    public override void _Ready()
    {
        // Initialize on scene ready
        SetupPlayer();
    }
    
    public override void _PhysicsProcess(double delta)
    {
        // Handle physics updates
        HandleMovement((float)delta);
        MoveAndSlide();
    }
    
    public void TakeDamage(int amount)
    {
        Health -= amount;
        EmitSignal(SignalName.HealthChanged, Health);
        
        if (Health <= 0)
        {
            Die();
        }
    }
    
    private void Die()
    {
        EmitSignal(SignalName.PlayerDied);
        QueueFree();
    }
}
```

## Godot Node Architecture

### Scene Organization

```
Main (Node2D)
├── World (Node2D)
│   ├── TileMap
│   ├── Platforms (Node2D)
│   └── Props (Node2D)
├── Entities (Node2D)
│   ├── Player (CharacterBody2D)
│   │   ├── Sprite2D
│   │   ├── CollisionShape2D
│   │   └── AnimationPlayer
│   └── Enemies (Node2D)
│       └── Enemy (CharacterBody2D)
├── UI (CanvasLayer)
│   ├── HUD (Control)
│   └── PauseMenu (Control)
└── Systems (Node)
    ├── GameManager (Node)
    └── AudioManager (Node)
```

### Node Lifecycle

```gdscript
# GDScript Node Lifecycle
func _enter_tree() -> void:
    # Called when node enters the scene tree
    pass

func _ready() -> void:
    # Called once when node is ready
    # All children are ready at this point
    pass

func _process(delta: float) -> void:
    # Called every frame
    # Use for non-physics updates
    pass

func _physics_process(delta: float) -> void:
    # Called at fixed intervals
    # Use for physics-related updates
    pass

func _exit_tree() -> void:
    # Called when node leaves the scene tree
    pass
```

## Resource System

### Custom Resources

```gdscript
# enemy_data.gd
extends Resource
class_name EnemyData

@export var enemy_name: String = "Goblin"
@export var max_health: int = 50
@export var move_speed: float = 150.0
@export var damage: int = 10
@export var sprite: Texture2D
```

### Using Resources

```gdscript
extends CharacterBody2D
class_name Enemy

@export var enemy_data: EnemyData

var current_health: int

func _ready() -> void:
    if enemy_data:
        current_health = enemy_data.max_health
        $Sprite2D.texture = enemy_data.sprite
```

## Signal System

### Signal Patterns

```gdscript
# Defining and emitting signals
extends Node
class_name GameManager

signal game_started()
signal game_over(score: int)
signal level_completed(level_number: int, time: float)

func start_game() -> void:
    # Game start logic
    game_started.emit()

func end_game(final_score: int) -> void:
    # Game end logic
    game_over.emit(final_score)
```

### Connecting Signals

```gdscript
# Connecting signals in code
func _ready() -> void:
    # Connect with callable
    game_manager.game_started.connect(_on_game_started)
    
    # Connect with binds
    button.pressed.connect(_on_button_pressed.bind(button_id))
    
    # One-shot connection
    timer.timeout.connect(_on_timer_timeout, CONNECT_ONE_SHOT)

func _on_game_started() -> void:
    print("Game started!")
```

## Autoload (Singleton) Pattern

```gdscript
# GameManager.gd - Add to Project Settings > Autoload
extends Node

var score: int = 0
var current_level: int = 1

func _ready() -> void:
    # Singleton is ready
    process_mode = Node.PROCESS_MODE_ALWAYS  # Continue during pause

func add_score(points: int) -> void:
    score += points
    
func reset_game() -> void:
    score = 0
    current_level = 1
    get_tree().change_scene_to_file("res://scenes/MainMenu.tscn")
```

## Performance Optimization

### Object Pooling

```gdscript
# ObjectPool.gd
extends Node
class_name ObjectPool

@export var bullet_scene: PackedScene
@export var pool_size: int = 20

var _bullet_pool: Array[Node] = []

func _ready() -> void:
    for i in pool_size:
        var bullet = bullet_scene.instantiate()
        bullet.set_process(false)
        bullet.set_physics_process(false)
        bullet.visible = false
        add_child(bullet)
        _bullet_pool.append(bullet)

func get_bullet() -> Node:
    for bullet in _bullet_pool:
        if not bullet.visible:
            bullet.set_process(true)
            bullet.set_physics_process(true)
            bullet.visible = true
            return bullet
    
    # Pool exhausted, create new instance
    var new_bullet = bullet_scene.instantiate()
    add_child(new_bullet)
    _bullet_pool.append(new_bullet)
    return new_bullet

func return_bullet(bullet: Node) -> void:
    bullet.set_process(false)
    bullet.set_physics_process(false)
    bullet.visible = false
```

### Performance Best Practices

- Cache node references in `_ready()` instead of using `get_node()` repeatedly
- Use `set_physics_process(false)` and `set_process(false)` for inactive objects
- Implement LOD (Level of Detail) for complex scenes
- Use `VisibleOnScreenNotifier2D` to disable off-screen processing
- Batch draw calls by using texture atlases
- Minimize use of `get_node()` in loops

## Input Handling

### Input Map Configuration

```gdscript
# Configure actions in Project Settings > Input Map
# Then use in code:

func _ready() -> void:
    # Set up input actions in Project Settings
    pass

func _process(_delta: float) -> void:
    if Input.is_action_just_pressed("jump"):
        _jump()
    
    if Input.is_action_pressed("move_left"):
        velocity.x = -SPEED
    elif Input.is_action_pressed("move_right"):
        velocity.x = SPEED
    else:
        velocity.x = 0

func _input(event: InputEvent) -> void:
    # For one-time inputs
    if event.is_action_pressed("pause"):
        get_tree().paused = not get_tree().paused
```

## Error Handling

### GDScript Error Handling

```gdscript
func load_save_data() -> Dictionary:
    var save_file = FileAccess.open("user://savegame.dat", FileAccess.READ)
    
    if save_file == null:
        push_error("Failed to open save file")
        return {}
    
    var save_data = save_file.get_var()
    save_file.close()
    
    if save_data == null:
        push_warning("Save file is empty")
        return {}
    
    return save_data

func safe_divide(a: float, b: float) -> float:
    assert(b != 0, "Division by zero!")
    return a / b
```

## Testing

### GUT (Godot Unit Test) Framework

```gdscript
# test_player.gd
extends GutTest

var player: Player

func before_each():
    player = preload("res://entities/Player.tscn").instantiate()
    add_child_autofree(player)

func test_player_takes_damage():
    var initial_health = player.health
    player.take_damage(20)
    assert_eq(player.health, initial_health - 20)

func test_player_dies_at_zero_health():
    player.health = 10
    watch_signals(player)
    player.take_damage(10)
    assert_signal_emitted(player, "player_died")
```

### GoDotTest (C# Testing)

```csharp
using GoDotTest;

[TestClass]
public class PlayerTests : TestClass
{
    private Player _player;
    
    [TestInitialize]
    public void Setup()
    {
        _player = new Player();
        AddChild(_player);
    }
    
    [TestMethod]
    public void PlayerTakesDamage()
    {
        int initialHealth = _player.Health;
        _player.TakeDamage(20);
        AssertEqual(_player.Health, initialHealth - 20);
    }
}
```

## Project Structure

```
res://
├── scenes/
│   ├── main.tscn
│   ├── levels/
│   │   ├── level_01.tscn
│   │   └── level_02.tscn
│   └── ui/
│       ├── main_menu.tscn
│       └── hud.tscn
├── scripts/
│   ├── player/
│   │   ├── player.gd
│   │   └── player_controller.gd
│   ├── enemies/
│   │   └── enemy_base.gd
│   └── systems/
│       ├── game_manager.gd
│       └── save_system.gd
├── resources/
│   ├── enemy_data/
│   │   ├── goblin.tres
│   │   └── skeleton.tres
│   └── item_data/
├── assets/
│   ├── sprites/
│   ├── audio/
│   │   ├── music/
│   │   └── sfx/
│   └── fonts/
└── tests/
    ├── unit/
    └── integration/
```

## Development Workflow

### Story Implementation Process

1. **Understand Requirements:**
   - Review story acceptance criteria
   - Identify Godot-specific implementation needs
   - Plan scene structure and node hierarchy

2. **Implementation:**
   - Create scenes and scripts following naming conventions
   - Use appropriate node types (CharacterBody2D for players/enemies, Area2D for triggers)
   - Implement in GDScript for rapid iteration, C# for performance-critical code

3. **Testing:**
   - Write GUT tests for GDScript
   - Write GoDotTest tests for C#
   - Test on all target platforms

4. **Optimization:**
   - Profile using Godot's built-in profiler
   - Optimize draw calls and physics processing
   - Implement object pooling where needed

5. **Documentation:**
   - Document complex systems with comments
   - Update story completion status
   - Note any performance considerations

## Performance Targets

### Frame Rate
- **Desktop**: 60 FPS stable
- **Mobile**: 60 FPS on modern devices, 30 FPS minimum on older devices
- **Web**: 60 FPS in modern browsers

### Memory Usage
- Keep texture memory under control using import settings
- Monitor scene complexity (node count)
- Use ResourceLoader for dynamic loading

### Build Size
- Optimize texture compression
- Remove unused assets
- Use Godot's export templates appropriately

## Platform-Specific Considerations

### Mobile
- Touch input handling with `InputEventScreenTouch`
- Screen size adaptation using anchors and containers
- Performance scaling for different devices

### Web
- Consider download size (use .wasm.gz compression)
- Handle browser-specific limitations
- Test in multiple browsers

### Desktop
- Multiple resolution support
- Windowed/fullscreen toggling
- Save data in user directory

These guidelines ensure consistent, high-quality game development using Godot's features and best practices while maintaining performance across all target platforms.